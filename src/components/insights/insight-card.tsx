import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Insight } from "@/data/insights";
export function InsightCard({ article }: { article: Insight }) {
  return (
    <article className="group">
      <Link
        href={`/insights/${article.slug}`}
        className="block overflow-hidden"
        aria-label={`Read ${article.title}`}
      >
        <Image
          src={article.image}
          alt={
            article.category === "Governance"
              ? "Professionals working together in a bright office"
              : "Contemporary corporate architecture and workspace"
          }
          width={700}
          height={450}
          className="corporate-image aspect-[1.55] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="mt-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest">
        <span className="text-highlight">{article.category}</span>
        <span className="text-muted-foreground">{article.readingTime}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold leading-7 tracking-tight">
        <Link href={`/insights/${article.slug}`}>{article.title}</Link>
      </h3>
      <p className="mt-3 text-base leading-6 text-muted-foreground">
        {article.excerpt}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm tracking-wide text-muted-foreground">
          {article.sample
            ? "SAMPLE EDITORIAL · FOR REVIEW"
            : new Date(article.date).toLocaleDateString("en-NG")}
        </span>
        <Link
          className="inline-flex size-11 items-center justify-center"
          href={`/insights/${article.slug}`}
          aria-label={`Read ${article.title}`}
        >
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
