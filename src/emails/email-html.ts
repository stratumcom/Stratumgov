import { brand } from "@/config/brand";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function display(value: string) {
  return escapeHtml(value || "Not supplied").replaceAll(/\r\n|\r|\n/g, "<br />");
}

function emailShell({
  preview,
  label,
  title,
  intro,
  body,
  footnote,
}: {
  preview: string;
  label: string;
  title: string;
  intro: string;
  body: string;
  footnote: string;
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${brand.surface};color:${brand.ink};font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;font-size:1px;line-height:1px;color:${brand.surface};max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preview)}</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${brand.surface};">
      <tr><td align="center" style="padding:32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${brand.border};">
          <tr><td style="background:${brand.blue};padding:30px 36px 28px;">
            <div style="font-size:21px;font-weight:700;letter-spacing:0.08em;color:#ffffff;line-height:1.2;">STRATUM<span style="color:#b9bffd;">.</span></div>
            <div style="margin-top:8px;font-size:10px;font-weight:700;letter-spacing:0.22em;color:#dce0ff;"> GOVERNANCE LTD.</div>
          </td></tr>
          <tr><td style="height:5px;background:#b9bffd;font-size:1px;line-height:1px;">&nbsp;</td></tr>
          <tr><td style="padding:36px 36px 30px;">
            <div style="display:inline-block;padding:7px 11px;background:#eeeefe;color:${brand.blue};font-size:10px;font-weight:700;letter-spacing:0.16em;">${escapeHtml(label)}</div>
            <h1 style="margin:20px 0 12px;color:${brand.blue};font-family:Georgia,'Times New Roman',serif;font-size:31px;line-height:1.2;font-weight:400;">${escapeHtml(title)}</h1>
            <p style="margin:0 0 27px;color:${brand.muted};font-size:15px;line-height:1.75;">${escapeHtml(intro)}</p>
            ${body}
          </td></tr>
          <tr><td style="padding:23px 36px 28px;border-top:1px solid ${brand.border};background:${brand.white};">
            <p style="margin:0;color:${brand.muted};font-size:12px;line-height:1.7;">${escapeHtml(footnote)}</p>
            <p style="margin:11px 0 0;color:${brand.blue};font-size:11px;font-weight:700;letter-spacing:0.1em;">Stratum Governance Ltd.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function ownerNotificationHtml(
  kind: "contact" | "consultation",
  fields: Record<string, string>,
) {
  const title = kind === "contact" ? "New contact enquiry" : "New consultation request";
  const rows = Object.entries(fields)
    .map(
      ([label, value]) => `<tr><td style="padding:15px 0;border-bottom:1px solid ${brand.border};vertical-align:top;">
        <div style="margin-bottom:6px;color:${brand.muted};font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">${escapeHtml(label)}</div>
        <div style="color:${brand.ink};font-size:15px;line-height:1.65;overflow-wrap:anywhere;">${display(value)}</div>
      </td></tr>`,
    )
    .join("");
  return emailShell({
    preview: `${title} from ${fields["Full name"] || "a visitor"}`,
    label: "NEW WEBSITE ENQUIRY",
    title,
    intro: "A new enquiry has arrived through the website. Reply to this email to contact the sender.",
    body: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:2px solid ${brand.blue};">${rows}</table>`,
    footnote:
      "This notification was generated from a website form. A consultation is only booked after your team confirms it.",
  });
}

export function consultationConfirmationHtml(name: string, reference: string) {
  return emailShell({
    preview: "We received your consultation request and will be in touch about the next steps.",
    label: "REQUEST RECEIVED",
    title: "Thank you for getting in touch.",
    intro: `Hello ${name}, we have received your consultation request. Our team will review it and contact you using the details you provided.`,
    body: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#eeeefe;border-left:4px solid ${brand.blue};">
      <tr><td style="padding:20px 22px;">
        <div style="color:${brand.blue};font-size:10px;font-weight:700;letter-spacing:0.14em;">YOUR ENQUIRY REFERENCE</div>
        <div style="margin-top:8px;color:${brand.ink};font-size:16px;font-weight:700;line-height:1.5;overflow-wrap:anywhere;">${display(reference)}</div>
      </td></tr>
    </table>
    <h2 style="margin:29px 0 9px;color:${brand.blue};font-family:Georgia,'Times New Roman',serif;font-size:23px;font-weight:400;">What happens next?</h2>
    <p style="margin:0;color:${brand.ink};font-size:15px;line-height:1.75;">We’ll review your request and follow up to discuss the next steps. Your preferred date or format is not a confirmed booking until our team confirms it.</p>`,
    footnote:
      "This is an automated acknowledgement. Please keep your reference if you need to follow up.",
  });
}
