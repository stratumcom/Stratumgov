import {
  type Assessment,
  type Profile,
  companyTypes,
  employeeCounts,
  assessmentNotice,
  scoreExplanation,
  complianceSources,
} from "./assessment";
const ascii = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/[^\x20-\x7e\n]/g, "");
function wrap(value: string, width = 86): string[] {
  const lines: string[] = [];
  for (const paragraph of ascii(value).split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/)) {
      // Split long source URLs as well as ordinary prose.
      for (let offset = 0; offset < word.length; offset += width) {
        const part = word.slice(offset, offset + width);
        if ((line + " " + part).trim().length > width) {
          lines.push(line);
          line = "";
        }
        line = (line + " " + part).trim();
      }
    }
    lines.push(line);
  }
  return lines;
}
export function reportLines(
  profile: Profile,
  result: Assessment,
  generated = new Date(),
): string[] {
  const lines = [
    "STRATUM GOVERNANCE LTD",
    "Corporate Compliance Health Report",
    `Prepared: ${generated.toLocaleDateString("en-GB", { timeZone: "Africa/Lagos" })}`,
    "",
    `Corporate health score: ${result.score}% - ${result.label}`,
    "",
    "COMPANY PROFILE",
    companyTypes[profile.companyType],
    employeeCounts[profile.employees],
    `Foreign shareholders: ${profile.foreignShareholders}`,
    `Foreign personnel working in Nigeria: ${profile.foreignWorkers}`,
    `SCUML sector: ${profile.scumlSector}`,
    `NAFDAC-regulated products: ${profile.regulatedProducts}`,
    "",
    "HOW TO READ YOUR SCORE",
    scoreExplanation,
    "",
    "YOUR RESULTS",
  ];
  const labels = {
    strength: "REPORTED STRENGTH",
    gap: "ACTION REQUIRED",
    unknown: "NEEDS CLARIFICATION",
    excluded: "NOT YET DUE",
  };
  for (const finding of result.findings) {
    lines.push(
      "",
      `${labels[finding.status]}: ${finding.question.title}`,
      finding.question.prompt,
      `Your answer: ${finding.answer === "not-due" ? "Not yet due" : finding.answer === "unsure" ? "Not sure" : finding.answer === "yes" ? "Yes" : "No"}`,
    );
    if (finding.status === "gap" || finding.status === "unknown")
      lines.push(`Next step: ${finding.question.action}`);
    if (finding.status === "unknown" && finding.question.applicabilityUncertain)
      lines.push("Applicability is unconfirmed and requires review.");
  }
  lines.push(
    "",
    "NEXT STEPS",
    "Request a free regularization strategy session through the consultation page on the Stratum Governance Ltd website. Your booking is confirmed separately by the team.",
    "",
    "ASSESSMENT SCOPE",
    assessmentNotice,
    "",
    "REFERENCE SOURCES (reviewed 17 October 2026)",
  );
  complianceSources.forEach((source) =>
    lines.push(source.title, source.url, ""),
  );
  return lines.flatMap((line) => wrap(line));
}
// A small, text-only PDF writer. All content is ASCII so stream lengths and
// cross-reference byte offsets are exact, with no network or PDF dependency.
export function createReportPdf(
  profile: Profile,
  result: Assessment,
  generated = new Date(),
): string {
  const lines = reportLines(profile, result, generated);
  const pages: string[][] = [];
  for (let offset = 0; offset < lines.length; offset += 43)
    pages.push(lines.slice(offset, offset + 43));
  const objects: string[] = [];
  const add = (content: string) => {
    objects.push(content);
    return objects.length;
  };
  add("<< /Type /Catalog /Pages 2 0 R >>");
  add(
    `<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_, i) => `${4 + i * 2} 0 R`).join(" ")}] >>`,
  );
  add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const escape = (text: string) =>
    text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  pages.forEach((page, i) => {
    add(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${5 + i * 2} 0 R >>`,
    );
    const stream = `BT /F1 10 Tf 15 TL 48 790 Td\n${page.map((line) => `(${escape(line)}) Tj T*`).join("\n")}\nET\nBT /F1 9 Tf 48 40 Td (Stratum Governance Ltd - Page ${i + 1} of ${pages.length}) Tj ET\n`;
    add(`<< /Length ${stream.length} >>\nstream\n${stream}endstream`);
  });
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${object}\nendobj\n`;
  });
  const start = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join(
      "",
    )}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF\n`;
  return pdf;
}
