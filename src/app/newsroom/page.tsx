import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { NewsroomList } from "@/components/newsroom/newsroom-list";
import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { CTA } from "@/components/shared/cta";
import { getPublishedNews, newsSources } from "@/data/newsroom";
import { seo } from "@/lib/seo";

export const metadata = seo(
  "Newsroom",
  "Selected news and official updates on corporate compliance, governance, financial reporting and data protection in Nigeria.",
  "/newsroom",
);

export default function Newsroom() {
  const articles = getPublishedNews();

  return (
    <>
      <PageHeading
        eyebrow="NEWSROOM"
        title="Keep a clear view of what’s changing."
        description="Selected stories and official updates from the worlds of corporate compliance, governance and data protection."
      />
      <section className="section-space">
        <Container>
          <div className="section-header">
            <div>
              <p className="eyebrow">THE BUSINESS LANDSCAPE</p>
              <h2 className="section-title mt-4">News worth knowing.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              Browse by topic and read each story here. Our updates include the
              original publication date and source, with a reference link for
              further reading.
            </p>
          </div>
          <NewsroomList articles={articles} />
        </Container>
      </section>
      <section
        className="section-space bg-surface"
        aria-labelledby="news-sources-title"
      >
        <Container>
          <div className="section-header">
            <div>
              <p className="eyebrow">OUR NEWS SOURCES</p>
              <h2 id="news-sources-title" className="section-title mt-4">
                Updates from official sources.
              </h2>
            </div>
            <Link href="/insights" className="text-link">
              Explore our insights{" "}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {newsSources.map((source) => {
              const latest = articles.find(
                (article) => article.source === source.articleSource,
              );
              if (!latest) return null;
              return (
                <Link
                  key={source.abbreviation}
                  href={`/news/${latest.slug}`}
                  className="news-source-card"
                  aria-label={`Read the latest ${source.name} update`}
                >
                  <div className="mb-7 flex items-center justify-between">
                    <span className="text-sm font-semibold tracking-widest text-brand-blue">
                      {source.abbreviation}
                    </span>
                    <Newspaper
                      aria-hidden="true"
                      className="size-5 text-brand-blue"
                    />
                  </div>
                  <h3 className="text-lg font-semibold leading-7">
                    {source.name}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    {source.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-brand-blue">
                    Read latest update{" "}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
