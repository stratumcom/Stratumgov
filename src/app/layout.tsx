import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/navigation/header";
import { HeaderInformationBar } from "@/components/navigation/header-information-bar";
import { Footer } from "@/components/layout/footer";
import { site, isProductionSite } from "@/config/site";
import { brandProperties } from "@/config/brand";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import "./globals.css";
const bodyFont = localFont({
  src: "../../public/fonts/dm-sans.ttf",
  variable: "--font-body",
  display: "swap",
});
const headingFont = localFont({
  src: [
    { path: "../../public/fonts/manrope.ttf", weight: "400" },
    { path: "../../public/fonts/manrope-semibold.ttf", weight: "600" },
  ],
  variable: "--font-heading",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} | Corporate compliance, considered.`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  robots: { index: isProductionSite, follow: true },
  icons: { icon: "/icons/mark.svg" },
  openGraph: { siteName: site.shortName, locale: "en_NG", type: "website" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" style={brandProperties}>
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header logo={site.logo} informationBar={<HeaderInformationBar />} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <ScrollReveal />
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.url,
              logo: new URL(site.logo, site.url).href,
              ...(site.email ? { email: site.email } : {}),
              ...(site.phone ? { telephone: site.phone } : {}),
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
