import Link from "next/link";
import type { Ref } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssessmentNotice } from "./assessment-notice";
import { getSafetyRecommendations } from "@/lib/health-safety/recommendations";
import { healthSafetySources } from "@/data/health-safety-questions";
import type { SafetyScore } from "@/types/health-safety";

export function AssessmentResults({
  score,
  onRetake,
  headingRef,
}: {
  score: SafetyScore;
  onRetake: () => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  const { strengths, gaps, seriousConcerns, recommendations, summary } = getSafetyRecommendations(score);
  return (
    <div>
      <p className="eyebrow">YOUR PRELIMINARY RESULTS</p>
      <h2 ref={headingRef} tabIndex={-1} className="section-title mt-4">{summary.title}</h2>
      <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-border py-6">
        <p className="text-5xl font-semibold tracking-tight text-brand-blue" aria-label={`Score: ${score.percentage} percent`}>
          {score.percentage}<span className="text-2xl">%</span>
        </p>
        <div className="max-w-xl text-sm leading-6 text-muted-foreground">
          <p className="font-semibold text-foreground">{score.points} of {score.maxPoints} points</p>
          <p>Established practice: 3 points · Partial: 1 · Missing or unsure: 0.</p>
          <p>All questions are equally weighted. This score reflects your answers, not an inspection.</p>
        </div>
      </div>
      <p className="mt-6 text-base leading-7 text-muted-foreground">{summary.description}</p>

      {seriousConcerns.length > 0 && (
        <section aria-labelledby="serious-concerns-heading" className="mt-8 border border-error bg-error-surface p-5 sm:p-6">
          <h3 id="serious-concerns-heading" className="flex items-start gap-3 text-xl font-semibold text-error">
            <TriangleAlert className="mt-1 size-5 shrink-0" aria-hidden="true" />
            Potentially serious safety concerns
          </h3>
          <p className="mt-3 text-base leading-7">These concerns take priority regardless of your overall score.</p>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-7">
            {seriousConcerns.map((finding) => <li key={finding.questionId}>{finding.seriousConcern}</li>)}
          </ul>
          <p className="mt-4 text-base leading-7">
            Where there is immediate danger, stop the affected activity, keep people away from the hazard, and seek competent assistance. Follow your emergency procedures if an emergency is underway.
          </p>
        </section>
      )}

      <div className="mt-9 grid items-start gap-8 md:grid-cols-2">
        <section aria-labelledby="strengths-heading">
          <h3 id="strengths-heading" className="text-xl font-semibold">Reported strengths</h3>
          {strengths.length > 0 ? (
            <ul className="mt-5 space-y-5">
              {strengths.map((finding) => (
                <li key={finding.questionId}>
                  <p className="font-semibold">{finding.topic}</p>
                  <p className="mt-1 text-base leading-7 text-muted-foreground">{finding.strength}</p>
                </li>
              ))}
            </ul>
          ) : <p className="mt-4 text-base leading-7 text-muted-foreground">No established practices were confirmed by these answers. Start by verifying your arrangements and assigning improvement actions.</p>}
        </section>
        <section aria-labelledby="gaps-heading">
          <h3 id="gaps-heading" className="text-xl font-semibold">Potential gaps and unknowns</h3>
          {gaps.length > 0 ? (
            <ul className="mt-5 space-y-5">
              {gaps.map((finding) => (
                <li key={finding.questionId}>
                  <p className="font-semibold">{finding.topic}{finding.answer === "unsure" ? " — needs verification" : ""}</p>
                  <p className="mt-1 text-base leading-7 text-muted-foreground">{finding.answerLabel}</p>
                </li>
              ))}
            </ul>
          ) : <p className="mt-4 text-base leading-7 text-muted-foreground">No gaps were reported in these 10 areas. Other risks may exist; confirm your answers through a competent workplace review.</p>}
        </section>
      </div>

      <section aria-labelledby="recommendations-heading" className="mt-9 border-t border-border pt-8">
        <h3 id="recommendations-heading" className="text-xl font-semibold">Recommended next steps</h3>
        {recommendations.length > 0 && (
          <ol className="mt-5 list-decimal space-y-5 pl-5">
            {recommendations.map((item) => (
              <li key={item.questionId} className="pl-1">
                <p className="font-semibold">{item.priority === "urgent" ? "Priority concern" : item.priority === "verify" ? "Verify" : "Improve"}: {item.topic}</p>
                <p className="mt-1 text-base leading-7 text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ol>
        )}
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          {recommendations.length > 0 ? "Assign an owner and a review date to each action. " : "Maintain your reported controls, keep records current, and review arrangements when work changes. "}
          Arrange a professional review to confirm the risks and requirements relevant to your workplace.
        </p>
      </section>
      <AssessmentNotice className="mt-8 border-t border-border pt-6" />
      <div className="mt-7 flex flex-wrap gap-3">
        <Button onClick={onRetake}>Retake the test</Button>
        <Button asChild variant="outline"><Link href="/">Back to homepage</Link></Button>
      </div>
      <details className="mt-8 text-sm leading-6 text-muted-foreground">
        <summary className="cursor-pointer text-highlight">About this assessment and its guidance</summary>
        <p className="mt-3">Questions cover general workplace practices informed by ILO guidance. The score is an indicative measure designed for this assessment, not an ILO rating or a validated audit standard.</p>
        <ul className="mt-3 space-y-2">
          {healthSafetySources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{source.title} (opens in a new tab)</a></li>)}
        </ul>
      </details>
    </div>
  );
}
