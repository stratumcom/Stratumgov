"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { navigation } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Container } from "@/components/shared/container";
export function Brand({
  light = false,
  logo = "/icons/mark.svg",
}: {
  light?: boolean;
  logo?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="stratumgov home"
      className={`brand ${light ? "brand-light" : ""}`}
    >
      <span
        className="brand-mark"
        aria-hidden="true"
        style={{ maskImage: `url(${logo})` }}
      />
      <span>
        <span className="brand-name">stratumgov</span>
        <span className="brand-subtitle">Corporate compliance</span>
      </span>
    </Link>
  );
}
export function Header({
  logo,
  informationBar,
}: {
  logo: string;
  informationBar?: ReactNode;
}) {
  const path = usePathname();
  const isActive = (href: string) =>
    path === href ||
    (href !== "/" && path.startsWith(`${href}/`)) ||
    (href === "/newsroom" && path.startsWith("/news/"));
  return (
    <header className="site-header">
      {informationBar}
      <Container className="header-main flex h-24 items-center justify-between gap-6">
        <Brand logo={logo} />
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 xl:flex"
        >
          {navigation.map((item) => (
            <Link
              className={`nav-link ${isActive(item.href) ? "active" : ""}`}
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="hidden xl:inline-flex">
          <Link href="/consultation">
            Book a consultation <ArrowUpRight className="ml-3 size-4" />
          </Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="xl:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[min(90vw,380px)]">
            <SheetTitle className="px-6 pt-8">Explore stratumgov</SheetTitle>
            <SheetDescription className="px-6 text-base">
              Find a service area or start a conversation.
            </SheetDescription>
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-2 px-6 py-8"
            >
              {[
                ...navigation,
                { label: "FAQs", href: "/faqs" },
                { label: "Book a consultation", href: "/consultation" },
              ].map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    className="rounded-sm border-l-2 border-transparent p-3 text-lg hover:bg-muted aria-[current=page]:border-brand-blue aria-[current=page]:bg-muted"
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
