import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="eyebrow">404 · A DIFFERENT PATH</p>
      <h1 className="mt-6 text-4xl font-medium">
        This page could not be found.
      </h1>
      <p className="mt-5 text-muted-foreground">
        Let’s get you back to a useful starting point.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          Return home
          <ArrowUpRight className="size-4" />
        </Link>
      </Button>
    </Container>
  );
}
