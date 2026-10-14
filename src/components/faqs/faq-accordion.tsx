"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import type { FAQ } from "@/types/service";
export function FAQAccordion({
  items,
  searchable = false,
}: {
  items: FAQ[];
  searchable?: boolean;
}) {
  const [query, setQuery] = useState("");
  const filtered = items.filter((f) =>
    `${f.question} ${f.answer} ${f.category || ""}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <>
      {searchable && (
        <div className="relative mb-8">
          <label htmlFor="faq-search" className="sr-only">
            Search frequently asked questions
          </label>
          <Search className="absolute left-4 top-4 size-4 text-muted-foreground" />
          <Input
            id="faq-search"
            className="pl-11"
            placeholder="Search your question…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
      <Accordion type="single" collapsible>
        {filtered.map((f) => (
          <AccordionItem key={f.question} value={f.question}>
            <AccordionTrigger className="py-6 text-left text-base font-medium hover:no-underline">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="max-w-2xl leading-7 text-muted-foreground">
              {f.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {filtered.length === 0 && (
        <p role="status" className="py-8 text-muted-foreground">
          No matching questions. Try another search or contact us.
        </p>
      )}
    </>
  );
}
