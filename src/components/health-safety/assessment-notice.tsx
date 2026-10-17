export function AssessmentNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm leading-6 text-muted-foreground ${className}`}>
      This preliminary self-assessment is not a substitute for a formal audit or
      professional advice. It does not certify legal compliance or workplace
      safety. Requirements vary by location, industry, and activity.
    </p>
  );
}
