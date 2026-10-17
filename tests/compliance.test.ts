import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
import {
  assess,
  questionsFor,
  type Profile,
  type Answers,
} from "../src/lib/compliance/assessment";
import { createReportPdf, reportLines } from "../src/lib/compliance/report";
import { promotionWindow } from "../src/data/promotions";
const local: Profile = {
  companyType: "ltd",
  employees: "0",
  foreignShareholders: "no",
  foreignWorkers: "no",
  scumlSector: "no",
  regulatedProducts: "no",
};
const complete: Profile = {
  ...local,
  employees: "5+",
  foreignShareholders: "yes",
  foreignWorkers: "yes",
  scumlSector: "yes",
  regulatedProducts: "yes",
};
const healthy = (profile: Profile): Answers =>
  Object.fromEntries(
    questionsFor(profile).map((question) => [
      question.id,
      question.healthyAnswer || "yes",
    ]),
  );
test("checklist asks about foreign ownership, workforce and products only when applicable", () => {
  assert.deepEqual(
    questionsFor(local).map((q) => q.id),
    ["annual-returns", "unfiled-changes", "tax-id", "tax-clearance"],
  );
  const solo = questionsFor({ ...local, employees: "1-2" }).map((q) => q.id);
  assert.ok(solo.includes("nsitf"));
  assert.ok(!solo.includes("pensions"));
  assert.ok(
    questionsFor({ ...local, employees: "3-4" }).some(
      (q) => q.id === "pensions",
    ),
  );
  assert.equal(questionsFor(complete).length, 11);
  assert.ok(
    !questionsFor({ ...local, foreignWorkers: "yes" }).some(
      (q) => q.id === "nipc",
    ),
  );
  assert.ok(
    !questionsFor({ ...complete, companyType: "trustee" }).some(
      (q) => q.id === "nipc",
    ),
  );
});
test("reverse-worded unfiled changes are scored correctly and high scores still flag gaps", () => {
  assert.equal(assess(complete, healthy(complete)).score, 100);
  const result = assess(complete, {
    ...healthy(complete),
    "unfiled-changes": "yes",
  });
  assert.equal(result.gaps[0].question.id, "unfiled-changes");
  assert.equal(result.score, 91);
  assert.equal(result.label, "Action required");
});
test("unknowns are not asserted gaps, and not-yet-due items leave the denominator", () => {
  const profile = { ...local, scumlSector: "unsure" as const };
  const result = assess(profile, {
    ...healthy(profile),
    scuml: "no",
    "annual-returns": "not-due",
    "tax-clearance": "not-due",
  });
  assert.equal(result.score, 67);
  assert.equal(result.gaps.length, 0);
  assert.equal(result.unknowns.length, 1);
  assert.equal(result.excluded.length, 2);
  assert.equal(result.label, "Clarification needed");
  const uncertain = assess(
    local,
    Object.fromEntries(questionsFor(local).map((q) => [q.id, "unsure"])),
  );
  assert.equal(uncertain.score, 0);
  assert.equal(uncertain.gaps.length, 0);
});
test("incomplete and inapplicable answers cannot silently earn a score", () => {
  assert.throws(() => assess(local, {}), /Answer required/);
  assert.throws(
    () => assess(local, { ...healthy(local), "tax-id": "not-due" }),
    /Answer required/,
  );
  assert.equal(assess(local, { ...healthy(local), nipc: "no" }).gaps.length, 0);
});
test("report contains the answers, actions and scope with correct multipage PDF offsets", () => {
  const answers: Answers = {
    ...healthy(complete),
    nipc: "no",
    scuml: "unsure",
  };
  const result = assess(complete, answers);
  const text = reportLines(complete, result).join("\n");
  assert.match(text, /ACTION REQUIRED: NIPC registration/);
  assert.match(text, /NEEDS CLARIFICATION: SCUML registration/);
  assert.match(text, /does not check government\s+records/);
  const pdf = createReportPdf(complete, result);
  assert.ok(pdf.startsWith("%PDF-1.4"));
  assert.match(pdf, /\/Count [2-9]/);
  const start = Number(pdf.match(/startxref\n(\d+)/)![1]);
  assert.equal(pdf.slice(start, start + 4), "xref");
  const entries = [...pdf.matchAll(/(\d{10}) 00000 n/g)];
  entries.forEach((entry, index) =>
    assert.ok(pdf.slice(Number(entry[1])).startsWith(`${index + 1} 0 obj`)),
  );
  writeFileSync("/tmp/stratum-test-report.pdf", pdf);
});
test("promotion window expires exactly six months after the published website update", () => {
  assert.equal(promotionWindow(new Date("2026-10-16T22:59:59Z")).active, false);
  assert.equal(promotionWindow(new Date("2026-10-16T23:00:00Z")).active, true);
  assert.equal(promotionWindow(new Date("2027-04-16T22:59:59Z")).active, true);
  assert.equal(promotionWindow(new Date("2027-04-16T23:00:00Z")).active, false);
});
