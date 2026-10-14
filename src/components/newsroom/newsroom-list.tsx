"use client";

import { useState } from "react";
import { Newspaper, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsroomCategories, type NewsArticle } from "@/data/newsroom";
import { NewsCard } from "./news-card";

export function NewsroomList({ articles }: { articles: NewsArticle[] }) {
  const [category, setCategory] = useState("All news");
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const matches = articles.filter(
    (article) =>
      (category === "All news" || article.category === category) &&
      `${article.title} ${article.summary} ${article.source} ${article.category}`
        .toLowerCase()
        .includes(search),
  );
  const featured =
    category === "All news" && !search
      ? matches.find((article) => article.featured)
      : undefined;
  const remaining = matches.filter((article) => article.id !== featured?.id);

  function reset() {
    setCategory("All news");
    setQuery("");
  }

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div
          role="group"
          aria-label="Filter newsroom by topic"
          className="flex flex-wrap gap-2"
        >
          {["All news", ...newsroomCategories].map((topic) => (
            <Button
              key={topic}
              variant={category === topic ? "default" : "outline"}
              aria-pressed={category === topic}
              onClick={() => setCategory(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
        <div className="relative w-full lg:max-w-xs">
          <label htmlFor="newsroom-search" className="sr-only">
            Search newsroom
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-4 size-4 text-muted-foreground"
          />
          <Input
            id="newsroom-search"
            type="search"
            placeholder="Search updates…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-11"
          />
        </div>
      </div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-muted-foreground"
        >
          {matches.length} {matches.length === 1 ? "update" : "updates"}
          {category === "All news" ? "" : ` in ${category}`}
          {search ? ` matching “${query.trim()}”` : ""}.
        </p>
        {(category !== "All news" || query) && (
          <Button variant="ghost" onClick={reset} className="text-sm">
            Clear filters <X aria-hidden="true" className="size-4" />
          </Button>
        )}
      </div>
      {featured && (
        <div className="mb-9">
          <NewsCard article={featured} featured />
        </div>
      )}
      {remaining.length > 0 && (
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {remaining.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
      {matches.length === 0 && (
        <div className="newsroom-empty">
          <Newspaper
            aria-hidden="true"
            className="mb-5 size-9 text-brand-blue"
          />
          <h3 className="text-xl font-semibold">
            {category === "Company news" && !search
              ? "Company updates will appear here."
              : "No updates match your search."}
          </h3>
          <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
            {category === "Company news" && !search
              ? "Explore the industry and regulatory updates while we prepare our next announcement."
              : "Try another topic or a different search term."}
          </p>
          <Button onClick={reset} variant="outline" className="mt-6">
            View all news
          </Button>
        </div>
      )}
    </>
  );
}
