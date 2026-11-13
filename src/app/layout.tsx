import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/navigation/header";
import { HeaderInformationBar } from "@/components/navigation/header-information-bar";
import { Footer } from "@/components/layout/footer";
import { site, isProductionSite } from "@/config/site";
import { brandProperties } from "@/config/brand";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { businessStructuredData } from "@/lib/structured-data";
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
    default: `${site.name} | Company Registration & Compliance in Abuja`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  robots: { index: isProductionSite, follow: true },
  icons: { icon: "/icons/mark.svg" },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  openGraph: { siteName: site.name, locale: "en_NG", type: "website" },
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
            __html: JSON.stringify(businessStructuredData()).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      </body>
    </html>
  );
}
