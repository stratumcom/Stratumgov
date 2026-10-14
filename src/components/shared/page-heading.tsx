import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./container";
export function PageHeading({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb?: string;
}) {
  return (
    <section className="page-heading on-blue">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex items-center gap-2 text-sm text-white/80"
        >
          <Link href="/">Home</Link>
          <ChevronRight className="size-3" />
          <span aria-current="page">{breadcrumb || eyebrow}</span>
        </nav>
        <p className="eyebrow text-highlight">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/80">
          {description}
        </p>
      </Container>
    </section>
  );
}
