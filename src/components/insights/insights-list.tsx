"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InsightCard } from "./insight-card";
import type { Insight } from "@/data/insights";
export function InsightsList({ articles }: { articles: Insight[] }) {
  const [category, setCategory] = useState("All insights");
  return (
    <>
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter insights"
      >
        {["All insights", ...new Set(articles.map((a) => a.category))].map(
          (c) => (
            <Button
              variant={c === category ? "default" : "outline"}
              aria-pressed={c === category}
              key={c}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ),
        )}
      </div>
      <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
        {articles
          .filter((a) => category === "All insights" || a.category === category)
          .map((a) => (
            <InsightCard key={a.slug} article={a} />
          ))}
      </div>
    </>
  );
}
