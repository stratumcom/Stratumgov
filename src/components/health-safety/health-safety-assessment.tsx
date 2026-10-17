"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { healthSafetyQuestions } from "@/data/health-safety-questions";
import { calculateSafetyScore } from "@/lib/health-safety/scoring";
import type { SafetyAnswers } from "@/types/health-safety";
import { AssessmentNotice } from "./assessment-notice";
import { AssessmentProgress } from "./assessment-progress";
import { AssessmentQuestion } from "./assessment-question";
import { AssessmentResults } from "./assessment-results";

export function HealthSafetyAssessment() {
  const [stage, setStage] = useState<"intro" | "questions" | "results">("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<SafetyAnswers>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const question = healthSafetyQuestions[questionIndex];
  const answered = healthSafetyQuestions.filter((item) => answers[item.id] !== undefined).length;
  const isLast = questionIndex === healthSafetyQuestions.length - 1;

  useEffect(() => {
    // Leave initial page focus alone; move it to each newly displayed screen
    // after the visitor starts, including when they retake the assessment.
    if (stage !== "intro" || started.current) {
      started.current = true;
      headingRef.current?.focus();
    }
  }, [stage, questionIndex]);

  function retake() {
    setAnswers({});
    setQuestionIndex(0);
    setStage("intro");
  }

  function next() {
    if (!answers[question.id]) return;
    if (isLast) {
      if (answered === healthSafetyQuestions.length) setStage("results");
    } else {
      setQuestionIndex((index) => index + 1);
    }
  }

  if (stage === "results") {
    return <AssessmentResults score={calculateSafetyScore(answers)} onRetake={retake} headingRef={headingRef} />;
  }

  if (stage === "intro") {
    return (
      <div>
        <ClipboardCheck className="size-9 text-highlight" strokeWidth={1.5} aria-hidden="true" />
        <h2 ref={headingRef} tabIndex={-1} className="section-title mt-5">A clearer picture of workplace safety.</h2>
        <p className="mt-5 text-base leading-8 text-muted-foreground">
          Answer {healthSafetyQuestions.length} short questions about your current arrangements.
          In approximately 3–5 minutes, you&apos;ll receive a score, reported
          strengths, potential gaps, and practical next steps.
        </p>
        <ul className="mt-6 list-disc space-y-3 pl-5 text-base leading-7">
          <li>Choose the answer that best reflects what happens today, rather than what is planned.</li>
          <li>Select &ldquo;I&apos;m not sure&rdquo; where arrangements need to be verified.</li>
          <li>You can go back and change answers before viewing your results.</li>
          <li>Potentially serious concerns are highlighted separately, even with a high overall score.</li>
        </ul>
        <p className="mt-6 text-sm leading-6 text-muted-foreground">
          No personal details are required. Answers stay in this page and are
          not submitted or saved. Refreshing or leaving the page resets the test.
        </p>
        <AssessmentNotice className="mt-6 border-t border-border pt-6" />
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Button onClick={() => setStage("questions")}>Start the health check <ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Link href="/" className="text-link">Back to homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AssessmentProgress current={questionIndex + 1} total={healthSafetyQuestions.length} answered={answered} />
      <AssessmentQuestion
        key={question.id}
        question={question}
        answer={answers[question.id]}
        onAnswer={(answer) => setAnswers((current) => ({ ...current, [question.id]: answer }))}
        headingRef={headingRef}
      />
      <p className="mt-5 text-sm text-muted-foreground">Choose one answer to continue.</p>
      <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-6">
        <Button variant="outline" disabled={questionIndex === 0} onClick={() => setQuestionIndex((index) => Math.max(0, index - 1))}>
          <ArrowLeft className="size-4" aria-hidden="true" /> Previous
        </Button>
        <Button disabled={!answers[question.id]} onClick={next}>
          {isLast ? "View results" : "Next"} <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
      <AssessmentNotice className="mt-6" />
      <Link href="/" className="text-link mt-4">Back to homepage</Link>
    </div>
  );
}
