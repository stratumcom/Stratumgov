export function AssessmentProgress({
  current,
  total,
  answered,
}: {
  current: number;
  total: number;
  answered: number;
}) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
        <p aria-live="polite" aria-atomic="true">Question {current} of {total}</p>
        <p>{answered} of {total} answered</p>
      </div>
      <div
        role="progressbar"
        aria-label="Assessment completion"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answered}
        aria-valuetext={`${answered} of ${total} questions answered`}
        className="h-2 overflow-hidden rounded-sm bg-surface"
      >
        <div className="h-full bg-brand-blue" style={{ width: `${(answered / total) * 100}%` }} />
      </div>
    </div>
  );
}
