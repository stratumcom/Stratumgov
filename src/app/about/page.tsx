import Image from "next/image";
import { Compass, Eye, ShieldCheck, HeartHandshake } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { CTA } from "@/components/shared/cta";
import { Approach } from "@/components/home/approach";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "About us",
  "Get to know the perspective and guiding principles of Stratum Governance Ltd..",
  "/about",
);
export default function About() {
  return (
    <>
      <PageHeading
        eyebrow="ABOUT STRATUMGOV"
        title="A thoughtful partner for the road ahead."
        description="Corporate compliance, governance and regulatory advisory begin with understanding your business."
      />
      <section className="section-space">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">OUR PERSPECTIVE</p>
            <h2 className="section-title mt-5">
              Strong foundations.
              <br />
              Clearer possibilities.
            </h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Stratum Governance Ltd. is a corporate compliance,
              governance and regulatory advisory business. Our website is
              designed to help you explore relevant service areas and start an
              informed conversation.
            </p>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              We believe a useful starting point is a clear understanding of
              your organization, your responsibilities and your priorities. An
              engagement should have a defined scope and a practical path
              forward.
            </p>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Company profile and guiding statements are editable drafts
              awaiting owner review.
            </p>
          </div>
          <Image
            src="/images/meeting.jpg"
            width={800}
            height={650}
            alt="Business professionals collaborating in an office; illustrative stock photography"
            className="corporate-image h-96 w-full object-cover"
          />
        </Container>
      </section>
      <section className="section-space bg-surface">
        <Container className="grid gap-12 md:grid-cols-2">
          {[
            {
              label: "OUR MISSION",
              title: "Make the next step clearer.",
              text: "To help organizations approach corporate responsibilities with greater clarity through considered advice and practical direction.",
            },
            {
              label: "OUR VISION",
              title: "Confidence built on sound foundations.",
              text: "To contribute to a business environment where thoughtful governance and organized compliance support responsible growth.",
            },
          ].map((v) => (
            <div key={v.label}>
              <p className="eyebrow">{v.label}</p>
              <h2 className="mt-5 text-3xl font-medium tracking-tight">
                {v.title}
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
                {v.text}
              </p>
            </div>
          ))}
        </Container>
      </section>
      <section className="section-space">
        <Container>
          <p className="eyebrow">GUIDING VALUES</p>
          <h2 className="section-title mt-5">
            Principles that shape the conversation.
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Integrity",
                text: "Be clear about scope, responsibilities and the basis for advice.",
              },
              {
                icon: Eye,
                title: "Clarity",
                text: "Use straightforward language and make the next steps understandable.",
              },
              {
                icon: Compass,
                title: "Practicality",
                text: "Connect recommendations to the context and priorities of the business.",
              },
              {
                icon: HeartHandshake,
                title: "Respect",
                text: "Approach each conversation with care for the client’s circumstances.",
              },
            ].map((v) => (
              <div key={v.title} className="border-t border-border pt-7">
                <v.icon className="size-7 text-highlight" strokeWidth={1.4} />
                <h3 className="mt-6 text-xl font-semibold">{v.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <Approach />
      {site.team.length > 0 && (
        <section className="section-space bg-surface">
          <Container>
            <p className="eyebrow">OUR PEOPLE</p>
            <h2 className="section-title mt-5">
              The people behind the perspective.
            </h2>
            {site.team.length > 0 && (
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {site.team.map((t) => (
                  <article key={t.name}>
                    {t.image && (
                      <Image
                        src={t.image}
                        width={500}
                        height={500}
                        alt={t.name}
                      />
                    )}
                    <h3 className="mt-5 text-xl">{t.name}</h3>
                    <p className="mt-2 text-base text-highlight">{t.role}</p>
                    <p className="mt-4 text-base leading-7">{t.bio}</p>
                  </article>
                ))}
              </div>
            )}
          </Container>
        </section>
      )}
      <CTA />
    </>
  );
}
