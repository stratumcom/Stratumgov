import { PageHeading } from "./page-heading";
import { Container } from "./container";
export function LegalLayout({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: { heading: string; body: React.ReactNode }[];
}) {
  return (
    <>
      <PageHeading
        eyebrow="LEGAL & PRIVACY"
        title={title}
        description={description}
      />
      <Container className="max-w-3xl py-16 md:py-24">
        <div className="mb-10 border-l-2 border-highlight bg-surface p-5 text-base leading-7 text-muted-foreground">
          <strong className="font-medium text-foreground">
            Draft for review.
          </strong>{" "}
          This document requires approval by the business owner and a qualified
          professional before the website is launched. It has not received legal
          approval.<p className="mt-2">Draft date: 9 October 2026.</p>
        </div>
        {sections.map((s, i) => (
          <section key={s.heading} className="mb-9">
            <h2 className="mb-4 text-xl font-semibold">
              {i + 1}. {s.heading}
            </h2>
            <div className="text-base leading-8 text-muted-foreground">
              {s.body}
            </div>
          </section>
        ))}
      </Container>
    </>
  );
}
