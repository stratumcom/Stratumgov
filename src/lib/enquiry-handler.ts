import "server-only";
import { NextResponse } from "next/server";
import { contactSchema, consultationSchema } from "./validations";
import { emailConfiguration } from "./resend";
import { sendEnquiry } from "./email";
import { rateLimit } from "./rate-limit";
import { submissionTime } from "./submission-time";
import { getService } from "@/data/services";
function response(
  message: string,
  status: number,
  headers?: Record<string, string>,
) {
  return NextResponse.json(
    { message },
    { status, headers: { "Cache-Control": "no-store", ...headers } },
  );
}
export async function handleEnquiry(
  request: Request,
  kind: "contact" | "consultation",
) {
  try {
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin)
      return response(
        "This request could not be verified. Please reload the page and try again.",
        403,
      );
    if (
      !request.headers
        .get("content-type")
        ?.toLowerCase()
        .startsWith("application/json")
    )
      return response("Please submit the website form.", 415);
    if (Number(request.headers.get("content-length")) > 20000)
      return response("Your message is too long.", 413);
    const reader = request.body?.getReader();
    if (!reader) return response("The request is empty.", 400);
    let length = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 20000) {
        await reader.cancel();
        return response("Your message is too long.", 413);
      }
      chunks.push(value);
    }
    let raw: unknown;
    try {
      raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return response("Please submit a valid form request.", 400);
    }
    const parsed = (
      kind === "contact" ? contactSchema : consultationSchema
    ).safeParse(raw);
    if (!parsed.success)
      return response(
        "Please check your form fields and privacy consent.",
        400,
      );
    const data = parsed.data;
    if (
      "service" in data &&
      data.service !== "not-sure" &&
      !getService(data.service)
    )
      return response(
        "Please select an available service or choose ‘I’m not sure yet’.",
        400,
      );
    if (!emailConfiguration())
      return response(
        "Online enquiries are awaiting email configuration. Please use a listed contact method or try again later.",
        503,
      );
    const rate = await rateLimit(request, data.email);
    if (rate === "limited")
      return response(
        "Too many enquiries. Please try again in 15 minutes.",
        429,
        { "Retry-After": "900" },
      );
    if (rate === "unavailable")
      return response(
        "Online enquiries are temporarily unavailable. Please try again later.",
        503,
      );
    const timestamp = await submissionTime(kind, data.requestId);
    const fields: Record<string, string> = {
      "Full name": data.name,
      Email: data.email,
      Phone: data.phone,
      "Privacy consent": data.consent ? "Agreed" : "Not agreed",
      "Enquiry reference": data.requestId,
      "Submission date and time":
        new Date(timestamp).toLocaleString("en-NG", {
          timeZone: "Africa/Lagos",
          dateStyle: "full",
          timeStyle: "long",
        }) + " (Africa/Lagos)",
    };
    if ("company" in data) {
      Object.assign(fields, {
        "Company / organization": data.company,
        "Service of interest":
          data.service === "not-sure"
            ? "Not sure yet"
            : `${getService(data.service)!.title} (${data.service})`,
        "Consultation format": data.format,
        "Preferred date / availability": data.availability,
        "Client needs": data.message,
      });
    } else {
      Object.assign(fields, { Subject: data.subject, Message: data.message });
    }
    const sent = await sendEnquiry(
      kind,
      data.email,
      fields,
      data.requestId,
      data.name,
    );
    return sent
      ? response(
          kind === "consultation"
            ? "Your consultation request has been sent. The team will contact you to confirm the next steps and any booking."
            : "Your message has been sent. Thank you for contacting Stratum Governance.",
          200,
        )
      : response(
          "We could not send your enquiry. Please try again later or use a listed contact method.",
          502,
        );
  } catch {
    return response(
      "We could not process your enquiry. Please check your details and try again later.",
      500,
    );
  }
}
