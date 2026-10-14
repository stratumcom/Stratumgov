import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { NewsArticle } from "@/data/newsroom";

export function NewsCard({
  article,
  featured = false,
}: {
  article: NewsArticle;
  featured?: boolean;
}) {
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
    <article className={`news-card ${featured ? "news-card-featured" : ""}`}>
      <div className="news-card-copy">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="eyebrow text-xs">{article.category}</p>
          {featured && <span className="news-featured-label">IN FOCUS</span>}
        </div>
        <h3
          className={`mt-5 font-semibold tracking-tight ${featured ? "text-2xl leading-tight md:text-3xl" : "text-xl leading-7"}`}
        >
          <Link
            href={`/news/${article.slug}`}
            className="hover:text-brand-blue"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          {article.summary}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <CalendarDays aria-hidden="true" className="size-3.5" />
            <time dateTime={article.date}>{date}</time>
          </span>
          <span>Source: {article.source}</span>
        </div>
        <Link
          href={`/news/${article.slug}`}
          className="text-link mt-6 border-t border-border pt-5"
          aria-label={`Read story: ${article.title}`}
        >
          Read story
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      {featured && (
        <div className="news-featured-image">
          <Image
            src="/images/architecture.jpg"
            alt="Illustrative corporate architecture"
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            className="object-cover corporate-image"
          />
          <p className="news-image-caption">
            A perspective on the business landscape.
          </p>
        </div>
      )}
    </article>
  );
}
