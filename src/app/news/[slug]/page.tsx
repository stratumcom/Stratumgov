import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays } from "lucide-react";
import { getNewsArticle, getPublishedNews } from "@/data/newsroom";
import { NewsCard } from "@/components/newsroom/news-card";
import { ShareLinks } from "@/components/insights/share-links";
import { Container } from "@/components/shared/container";
import { CTA } from "@/components/shared/cta";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedNews().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = getNewsArticle((await params).slug);
  if (!article) return {};
  const metadata = seo(article.title, article.summary, `/news/${article.slug}`);
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article" as const,
      publishedTime: article.date,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = getNewsArticle((await params).slug);
  if (!article) notFound();
  const related = getPublishedNews()
    .filter((item) => item.slug !== article.slug)
    .sort(
      (a, b) =>
        Number(b.category === article.category) -
        Number(a.category === article.category),
    )
    .slice(0, 3);
  const date = new Date(`${article.date}T12:00:00+01:00`).toLocaleDateString(
    "en-NG",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Africa/Lagos",
    },
  );

  return (
    <>
      <article>
        <Container className="article-header">
          <Link href="/newsroom" className="text-link mb-10">
            <ArrowLeft aria-hidden="true" className="size-4" /> Back to newsroom
          </Link>
          <p className="eyebrow">{article.category}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {article.summary}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="size-4" />
              <span>
                Source published <time dateTime={article.date}>{date}</time>
              </span>
            </span>
            <span>Source: {article.source}</span>
          </div>
          <figure className="mt-10">
            <Image
              src="/images/architecture.jpg"
              width={1200}
              height={600}
              sizes="(max-width: 768px) 100vw, 1100px"
              priority
              alt="Illustrative corporate architecture"
              className="aspect-[2] w-full object-cover corporate-image"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Illustrative image.
            </figcaption>
          </figure>
        </Container>
        <Container className="max-w-3xl pb-20">
          <h2 className="mb-6 text-2xl font-semibold">The update</h2>
          {article.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mb-6 text-lg leading-8 text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
          {article.sourceUrl && (
            <aside
              aria-label="Original source"
              className="my-10 border-l-2 border-brand-blue bg-surface p-6"
            >
              <p className="text-sm font-semibold">Source: {article.source}</p>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                This story is our summary of the official announcement. The
                publisher’s original notice is available for further reading.
              </p>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link mt-5"
                aria-label={`View original announcement from ${article.source} (opens in a new tab)`}
              >
                View original announcement{" "}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </aside>
          )}
          <div className="border-t border-border pt-7">
            <ShareLinks
              url={new URL(`/news/${article.slug}`, site.url).href}
              title={article.title}
              label="Share this story"
            />
          </div>
        </Container>
      </article>
      <section
        className="section-space bg-surface"
        aria-labelledby="related-news-heading"
      >
        <Container>
          <p className="eyebrow">KEEP READING</p>
          <h2 id="related-news-heading" className="section-title mb-10 mt-4">
            More from the newsroom.
          </h2>
          <div className="grid gap-7 md:grid-cols-3">
            {related.map((item) => (
              <NewsCard key={item.id} article={item} />
            ))}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
