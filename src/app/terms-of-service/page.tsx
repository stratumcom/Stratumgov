import { LegalLayout } from "@/components/shared/legal-layout";
import { termsIntroduction, termsSections } from "@/data/terms";
import { websiteLastUpdated } from "@/data/promotions";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Terms of service",
  "Terms governing Stratum Governance Ltd corporate governance, company formation and regulatory compliance services.",
  "/terms-of-service",
);
export default function Terms() {
  return (
    <LegalLayout
      title="Terms of service."
      description="Terms governing access to our website and engagement of our corporate governance and regulatory compliance services."
      notice={
        <div className="mb-10 space-y-4 border-l-2 border-highlight bg-surface p-5 text-base leading-7 text-muted-foreground">
          <p>
            <strong>Effective date:</strong> On website launch.
          </p>
          <p>
            <strong>Last updated:</strong>{" "}
            {new Date(
              `${websiteLastUpdated}T12:00:00+01:00`,
            ).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Africa/Lagos",
            })}
            .
          </p>
          {termsIntroduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      }
      sections={termsSections.map((section) => ({
        heading: section.heading,
        body: (
          <div className="space-y-4">
            {section.paragraphs.map((paragraph) => {
              const [intro, ...bullets] = paragraph.split("●");
              return (
                <div key={paragraph}>
                  {intro.trim() && <p>{intro.trim()}</p>}
                  {bullets.length > 0 && (
                    <ul className="list-disc space-y-3 pl-6">
                      {bullets.map((bullet) => (
                        <li key={bullet}>{bullet.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        ),
      }))}
    />
  );
}
