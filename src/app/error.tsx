"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="container-shell py-24 text-center">
      <p className="eyebrow">PLEASE TRY AGAIN</p>
      <h1 className="mt-6 text-3xl font-medium text-error">We couldn’t load this page.</h1>
      <p className="mt-5 text-muted-foreground">
        Please retry, or return to the homepage.
      </p>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </section>
  );
}
