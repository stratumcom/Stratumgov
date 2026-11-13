import "server-only";
import {
  enquiryConfirmationHtml,
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
    subject: `New ${kind === "contact" ? "Contact Enquiry" : "Consultation Request"} — Stratum Corporate Ltd.`,
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
  const enquiry = kind === "contact" ? "message" : "consultation request";
  try {
    const acknowledgement = await config.client.emails.send(
      {
        from: config.from,
        to: email,
        replyTo: config.owner,
        subject: `We have received your ${enquiry} — Stratum Corporate Ltd.`,
        html: enquiryConfirmationHtml(kind, name, requestId),
        text: `Hello ${name},\n\nThank you for contacting Stratum Corporate Ltd. We have received your ${enquiry} and will get back to you shortly.\n\nReference: ${requestId}\n\nOur team will review your ${enquiry} and contact you using the details you provided. You can also reply to this email if you have anything to add.${kind === "consultation" ? " Your preferred date or format is not a confirmed booking until our team confirms it." : ""}\n\nThis is an automated acknowledgement. Please keep your reference if you need to follow up.`,
      },
      { idempotencyKey: `ack/${kind}/${requestId}` },
    );
    if (acknowledgement.error || !acknowledgement.data?.id) {
      console.error("[email] Client acknowledgement rejected", {
        type: acknowledgement.error?.name || "missing_email_id",
        status: acknowledgement.error?.statusCode ?? null,
      });
    }
  } catch (error) {
    console.error("[email] Client acknowledgement failed", {
      type: error instanceof Error ? error.name : "unknown",
    });
  }
  return true;
}
