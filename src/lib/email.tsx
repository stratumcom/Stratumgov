import "server-only";
import {
  consultationConfirmationHtml,
  ownerNotificationHtml,
} from "@/emails/email-html";
import { emailConfiguration } from "./resend";
export async function sendEnquiry(
  kind: "contact" | "consultation",
  email: string,
  fields: Record<string, string>,
  requestId: string,
  name: string,
) {
  const config = emailConfiguration();
  if (!config) return false;
  const notification = {
    from: config.from,
    to: config.owner,
    replyTo: email,
    subject: `New ${kind === "contact" ? "Contact Enquiry" : "Consultation Request"} — Stratum Governance Ltd.`,
    html: ownerNotificationHtml(kind, fields),
    text: Object.entries(fields)
      .map(([k, v]) => `${k}: ${v || "Not supplied"}`)
      .join("\n\n"),
  };
  const options = { idempotencyKey: `${kind}/${requestId}` };
  let result;
  try {
    result = await config.client.emails.send(notification, options);
  } catch (error) {
    console.error("[email] Owner notification failed", {
      type: error instanceof Error ? error.name : "unknown",
    });
    return false;
  }
  if (result.error || !result.data?.id) {
    console.error("[email] Owner notification rejected", {
      type: result.error?.name || "missing_email_id",
      status: result.error?.statusCode ?? null,
    });
    return false;
  }
  if (
    kind === "consultation" &&
    process.env.SEND_CLIENT_ACKNOWLEDGEMENT === "true"
  ) {
    try {
      await config.client.emails.send(
        {
          from: config.from,
          to: email,
          subject: "Your consultation request — stratum Governance",
          html: consultationConfirmationHtml(name, requestId),
          text: `Hello ${name}, we have received your consultation request. Reference: ${requestId}. The team will respond separately to confirm any booking.`,
        },
        { idempotencyKey: `ack/${requestId}` },
      );
    } catch {
      /* Owner delivery is complete; acknowledgement is optional. */
    }
  }
  return true;
}
