import type { Ref } from "react";
import type { SafetyAnswer, SafetyQuestion } from "@/types/health-safety";

export function AssessmentQuestion({
  question,
  answer,
  onAnswer,
  headingRef,
}: {
  question: SafetyQuestion;
  answer?: SafetyAnswer;
  onAnswer: (answer: SafetyAnswer) => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  return (
    <div>
      <p className="eyebrow">{question.topic.toUpperCase()}</p>
      <h2 ref={headingRef} tabIndex={-1} id={`${question.id}-heading`} className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl">
        {question.prompt}
      </h2>
      <p id={`${question.id}-help`} className="mt-4 text-base leading-7 text-muted-foreground">
        {question.help}
      </p>
      <fieldset aria-labelledby={`${question.id}-heading`} aria-describedby={`${question.id}-help`} className="mt-7 space-y-3">
        <legend className="sr-only">Choose one answer</legend>
        {question.options.map((option) => (
          <label key={option.id} className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors ${answer === option.id ? "border-brand-blue bg-surface" : "border-border hover:bg-surface"}`}>
            <input
              type="radio"
              name={question.id}
              value={option.id}
              checked={answer === option.id}
              onChange={() => onAnswer(option.id)}
              className="mt-1.5 size-4 shrink-0 accent-brand-blue"
            />
            <span className="text-base leading-7">{option.label}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}
