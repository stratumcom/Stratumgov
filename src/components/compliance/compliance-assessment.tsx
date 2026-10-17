"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  RotateCcw,
  CheckCircle2,
  CircleHelp,
  CircleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  assess,
  questionsFor,
  companyTypes,
  employeeCounts,
  assessmentNotice,
  scoreExplanation,
  complianceSources,
  type Profile,
  type Answers,
  type Answer,
  type Assessment,
  type Finding,
} from "@/lib/compliance/assessment";
import { createReportPdf } from "@/lib/compliance/report";

const selectClass =
  "mt-2 min-h-12 w-full min-w-0 rounded-md border border-input bg-background px-3 py-3 text-base";
const yesNo = { yes: "Yes", no: "No" };
const applicability = { yes: "Yes", no: "No", unsure: "Not sure" };

export function ComplianceAssessment() {
  const [stage, setStage] = useState<"profile" | "questions" | "results">(
    "profile",
  );
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<Assessment | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) heading.current?.focus();
  }, [stage, index]);
  const completeProfile = profile as Profile;
  const questions = stage === "profile" ? [] : questionsFor(completeProfile);
  function move(next: typeof stage) {
    started.current = true;
    setStage(next);
  }
  function start(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAnswers({});
    setIndex(0);
    setResult(null);
    move("questions");
  }
  function reset() {
    setAnswers({});
    setIndex(0);
    setResult(null);
    setProfile({});
    move("profile");
  }
  function download() {
    if (!result) return;
    const blob = new Blob([createReportPdf(completeProfile, result)], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "stratum-corporate-compliance-report.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
  const field = (
    key: keyof Profile,
    label: string,
    options: Record<string, string>,
    help?: string,
  ) => (
    <div key={key}>
      <label className="block font-medium" htmlFor={`profile-${key}`}>
        {label} <span aria-hidden="true">*</span>
      </label>
      {help && (
        <p
          id={`profile-${key}-help`}
          className="mt-1 text-sm leading-6 text-muted-foreground"
        >
          {help}
        </p>
      )}
      <select
        id={`profile-${key}`}
        name={key}
        className={selectClass}
        required
        value={profile[key] || ""}
        aria-describedby={help ? `profile-${key}-help` : undefined}
        onChange={(event) =>
          setProfile({ ...profile, [key]: event.target.value })
        }
      >
        <option value="" disabled>
          Select an answer
        </option>
        {Object.entries(options).map(([value, text]) => (
          <option value={value} key={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );

  if (stage === "profile")
    return (
      <div>
        <p className="eyebrow">STEP 1 OF 3 · COMPANY PROFILE</p>
        <h2
          ref={heading}
          tabIndex={-1}
          className="mt-4 text-3xl font-medium tracking-tight"
        >
          Start with your business.
        </h2>
        <p className="mt-4 leading-7 text-muted-foreground">
          Answer a few questions so we can tailor your checklist. No contact
          details are required. Your answers stay in this browser tab and are
          cleared when you leave or reload this page.
        </p>
        <form onSubmit={start} className="mt-8 space-y-6">
          {field("companyType", "What is your company type?", companyTypes)}
          {field(
            "foreignShareholders",
            "Does your business have foreign shareholders or owners?",
            yesNo,
            "Foreign ownership and foreign personnel are assessed separately.",
          )}
          {field(
            "foreignWorkers",
            "Do foreign directors or employees work in Nigeria for your business?",
            yesNo,
          )}
          {field(
            "employees",
            "How many employees do you currently have?",
            employeeCounts,
          )}
          {field(
            "scumlSector",
            "Does your business operate in a SCUML-designated sector?",
            applicability,
            "Examples include real estate, consulting and certain non-profit activities. Choose Not sure if you need help checking your classification.",
          )}
          {field(
            "regulatedProducts",
            "Do you manufacture, import or distribute NAFDAC-regulated products?",
            applicability,
            "Examples include foods, drugs, cosmetics and medical devices.",
          )}
          <Button type="submit">
            Continue to checklist <ArrowRight className="size-4" />
          </Button>
        </form>
        <p className="mt-6 text-sm leading-6 text-muted-foreground">
          {assessmentNotice}
        </p>
      </div>
    );

  if (stage === "results" && result) {
    const group = (
      title: string,
      findings: Finding[],
      icon: typeof CheckCircle2,
      empty: string,
    ) => {
      const Icon = icon;
      return (
        <section
          aria-label={title}
          className="mt-8 border-t border-border pt-6"
        >
          <h3 className="flex items-start gap-3 text-xl font-semibold">
            <Icon className="mt-1 size-5 shrink-0" aria-hidden="true" />
            {title}
          </h3>
          {findings.length ? (
            <ul className="mt-5 space-y-5">
              {findings.map((finding) => (
                <li key={finding.question.id}>
                  <p className="font-semibold">{finding.question.title}</p>
                  <p className="mt-1 text-base leading-7 text-muted-foreground">
                    {finding.status === "strength"
                      ? "You report this item is up to date."
                      : finding.status === "excluded"
                        ? "You report this item is not yet due; it is excluded from the score."
                        : finding.question.action}
                  </p>
                  {finding.question.applicabilityUncertain && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Applicability needs confirmation.
                    </p>
                  )}
                  {(finding.status === "gap" ||
                    finding.status === "unknown") && (
                    <Link
                      className="text-link mt-1"
                      href={`/services/${finding.question.serviceSlug}`}
                    >
                      How Stratum can help <ArrowUpRight className="size-4" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 leading-7 text-muted-foreground">{empty}</p>
          )}
        </section>
      );
    };
    return (
      <div>
        <p className="eyebrow">STEP 3 OF 3 · YOUR RESULTS</p>
        <h2
          ref={heading}
          tabIndex={-1}
          className="mt-4 text-3xl font-medium tracking-tight"
        >
          Your corporate compliance snapshot.
        </h2>
        <div className="mt-6 border border-border bg-surface p-6">
          <p className="text-sm font-medium uppercase tracking-wider">
            Corporate health score
          </p>
          <p
            className="mt-2 text-5xl font-semibold text-highlight"
            aria-label={`Score: ${result.score} percent`}
          >
            {result.score}%
          </p>
          <p className="mt-3 text-xl font-semibold">{result.label}</p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {result.strengths.length} of {result.included} assessed items
            reported up to date. {result.gaps.length} potential{" "}
            {result.gaps.length === 1 ? "gap" : "gaps"};{" "}
            {result.unknowns.length} needing clarification.
          </p>
        </div>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">
          {scoreExplanation}
        </p>
        {group(
          "What you are doing right",
          result.strengths,
          CheckCircle2,
          "No assessed items were reported as up to date.",
        )}
        {group(
          "Potential gaps requiring action",
          result.gaps,
          CircleAlert,
          "No gaps reported in the items assessed.",
        )}
        {group(
          "Items needing clarification",
          result.unknowns,
          CircleHelp,
          "No uncertain answers in the items assessed.",
        )}
        {result.excluded.length > 0 &&
          group("Items not yet due", result.excluded, CircleHelp, "")}
        <section className="mt-10 border border-border bg-surface p-5 sm:p-7">
          <h3 className="text-2xl font-semibold">
            How Stratum Governance Ltd can help
          </h3>
          <p className="mt-4 leading-7 text-muted-foreground">
            Turn your findings into a practical regularization plan. Download
            your report and request a free strategy session to discuss your
            records and priorities.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button onClick={download}>
              <Download className="size-4" />
              Download my health report (PDF)
            </Button>
            <Button asChild variant="outline">
              <Link href="/consultation?service=statutory-compliance-maintenance&purpose=regularization">
                Book a free regularization strategy session{" "}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
        <p className="mt-6 text-sm leading-6 text-muted-foreground">
          {assessmentNotice}
        </p>
        <details className="mt-6 border-t border-border pt-4">
          <summary className="cursor-pointer font-medium">
            Reference sources &amp; assessment scope
          </summary>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            This checklist covers the selected items only. Other tax,
            employment, industry and investment obligations may apply. Sources
            reviewed 17 October 2026.
          </p>
          <ul className="mt-3 space-y-3">
            {complianceSources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline underline-offset-4"
                >
                  {source.title} (opens in a new tab)
                </a>
              </li>
            ))}
          </ul>
        </details>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setIndex(0);
              move("questions");
            }}
          >
            Review my answers
          </Button>
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="size-4" />
            Start again
          </Button>
        </div>
      </div>
    );
  }

  const question = questions[index];
  const last = index === questions.length - 1;
  const answered = questions.filter((item) => answers[item.id]).length;
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!answers[question.id]) return;
    if (last) {
      setResult(assess(completeProfile, answers));
      move("results");
    } else setIndex(index + 1);
  }
  return (
    <div>
      <p className="eyebrow">STEP 2 OF 3 · COMPLIANCE CHECKLIST</p>
      <p className="mt-3 text-sm text-muted-foreground">
        Question {index + 1} of {questions.length} · {question.section}
      </p>
      <progress
        className="mt-3 h-2 w-full accent-[var(--brand-blue)]"
        max={questions.length}
        value={answered}
        aria-label="Checklist progress"
      />
      <h2 ref={heading} tabIndex={-1} className="mt-6 text-2xl font-semibold">
        {question.prompt}
      </h2>
      <p
        id="question-help"
        className="mt-4 text-base leading-7 text-muted-foreground"
      >
        {question.help}
      </p>
      <form onSubmit={next} className="mt-7">
        <fieldset aria-describedby="question-help">
          <legend className="sr-only">{question.prompt}</legend>
          <div className="space-y-3">
            {(
              [
                ...["yes", "no", "unsure"],
                ...(question.allowNotDue ? ["not-due"] : []),
              ] as Answer[]
            ).map((answer) => (
              <label
                key={`${question.id}-${answer}`}
                className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-md border p-4 ${answers[question.id] === answer ? "border-primary bg-surface" : "border-border"}`}
              >
                <input
                  className="size-5 shrink-0 accent-[var(--brand-blue)]"
                  type="radio"
                  name={question.id}
                  value={answer}
                  checked={answers[question.id] === answer}
                  onChange={() =>
                    setAnswers({ ...answers, [question.id]: answer })
                  }
                  required
                />
                <span>
                  {answer === "yes"
                    ? "Yes"
                    : answer === "no"
                      ? "No"
                      : answer === "unsure"
                        ? "Not sure"
                        : "Not yet due"}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-7 flex flex-wrap justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              index === 0 ? move("profile") : setIndex(index - 1)
            }
          >
            {index === 0 ? "Edit company profile" : "Previous"}
          </Button>
          <Button type="submit" disabled={!answers[question.id]}>
            {last ? "View results" : "Next"}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
