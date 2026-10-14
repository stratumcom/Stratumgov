import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { insights, getInsight } from "@/data/insights";
import { Container } from "@/components/shared/container";
import { InsightCard } from "@/components/insights/insight-card";
import { ShareLinks } from "@/components/insights/share-links";
import { CTA } from "@/components/shared/cta";
import { seo } from "@/lib/seo";
import { site } from "@/config/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const a = getInsight((await params).slug);
  return a
    ? {
        ...seo(a.title, a.excerpt, `/insights/${a.slug}`, a.sample),
        openGraph: {
          type: "article" as const,
          title: a.title,
          description: a.excerpt,
          publishedTime: a.date,
          authors: [a.author],
          images: [{ url: a.image }],
          url: `/insights/${a.slug}`,
        },
      }
    : {};
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const a = getInsight((await params).slug);
  if (!a) notFound();
  return (
    <>
      <article>
        <Container className="article-header">
          <Link href="/insights" className="text-link mb-10">
            <ArrowLeft className="size-4" />
            Back to insights
          </Link>
          <p className="eyebrow">{a.category.toUpperCase()}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            {a.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {a.excerpt}
          </p>
          <div className="mt-7 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>{a.author}</span>
            <span>·</span>
            <time dateTime={a.date}>
              {a.sample ? "Draft dated " : ""}
              {new Date(`${a.date}T12:00:00+01:00`).toLocaleDateString(
                "en-NG",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Africa/Lagos",
                },
              )}
            </time>
            <span>·</span>
            <span>{a.readingTime}</span>
          </div>
          <Image
            src={a.image}
            width={1200}
            height={600}
            sizes="(max-width:768px) 100vw, 1100px"
            priority
            alt="Illustrative corporate workspace and architecture"
            className="mt-10 aspect-[2] w-full object-cover"
          />
        </Container>
        <Container className="max-w-3xl pb-20">
          {a.sample && (
            <p className="mb-10 border-l-2 border-highlight bg-surface p-5 text-base leading-7 text-muted-foreground">
              Sample editorial for owner review. This draft is not a verified
              company publication and does not provide legal advice or current
              regulatory guidance.
            </p>
          )}
          {a.sections.map((s) => (
            <section key={s.heading} className="mb-10">
              <h2 className="mb-5 text-2xl font-semibold">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mb-4 leading-8 text-muted-foreground">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <div className="mb-8 flex flex-wrap gap-2">
            {a.tags.map((t) => (
              <span
                key={t}
                className="border border-border px-3 py-2 text-sm text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="border-t border-border pt-7">
            <ShareLinks
              url={new URL(`/insights/${a.slug}`, site.url).href}
              title={a.title}
            />
          </div>
        </Container>
      </article>
      <section className="section-space bg-surface">
        <Container>
          <p className="eyebrow">KEEP EXPLORING</p>
          <h2 className="section-title mb-10 mt-4">More perspectives.</h2>
          <div className="grid gap-10 sm:grid-cols-2">
            {insights
              .filter((i) => i.slug !== a.slug)
              .slice(0, 2)
              .map((i) => (
                <InsightCard key={i.slug} article={i} />
              ))}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
