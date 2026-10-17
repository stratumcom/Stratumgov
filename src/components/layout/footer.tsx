import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/navigation/header";
import { Container } from "@/components/shared/container";
import { site } from "@/config/site";
import { activeServices } from "@/data/services";
export function Footer() {
  return (
    <footer className="site-footer on-blue">
      <Container>
        <div className="grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1fr]">
          <div>
            <Brand light logo={site.logo} />
            <p className="mt-6 max-w-xs text-base leading-6 text-white/80">
              Clarity in compliance.
              <br />
              Confidence in your next chapter.
            </p>
            <p className="mt-6 text-sm tracking-widest text-highlight">
              GOVERNANCE · COMPLIANCE · ADVISORY
            </p>
          </div>
          <div>
            <h3 className="footer-title">Explore</h3>
            {[
              { label: "About us", href: "/about" },
              { label: "Our services", href: "/services" },
              { label: "Promotions", href: "/promotions" },
              {
                label: "Corporate compliance check",
                href: "/compliance-health-check",
              },
              { label: "Workplace safety check", href: "/health-safety-check" },
              { label: "Insights", href: "/insights" },
              { label: "Newsroom", href: "/newsroom" },
              { label: "FAQs", href: "/faqs" },
            ].map((l) => (
              <Link className="footer-link" key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="footer-title">Service areas</h3>
            {activeServices.map((s) => (
              <Link
                className="footer-link"
                key={s.slug}
                href={`/services/${s.slug}`}
              >
                {s.title}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="footer-title">Start a conversation</h3>
            <Link
              className="footer-link flex items-center gap-2"
              href="/contact"
            >
              Get in touch <ArrowUpRight className="size-3" />
            </Link>
            <Link className="footer-link" href="/consultation">
              Book a consultation
            </Link>
            {site.email && (
              <a
                className="footer-link break-all"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            )}
            {site.phone && (
              <a
                className="footer-link"
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
              >
                {site.phone}
              </a>
            )}
            {site.socialLinks.map((s) => (
              <a
                key={s.url}
                href={s.url}
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 footer-legal py-7 sm:flex-row">
          <p>
            © {new Date().getFullYear()} stratumgov · {site.name}. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-x-6">
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-of-service">Terms of service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
