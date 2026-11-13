import { brand } from "./brand";

export function siteUrl() {
  const url = new URL(process.env.SITE_URL || "https://www.stratumcorporate.com");
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) {
    throw new Error("SITE_URL must be an HTTP or HTTPS website address.");
  }
  return url.origin;
}

export function canIndexSite() {
  const production = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";
  return (
    production &&
    !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(new URL(siteUrl()).hostname)
  );
}

const socialProfiles = [
  { label: "Facebook", url: process.env.OWNER_FACEBOOK_URL || "" },
  { label: "X", url: process.env.OWNER_X_URL || "" },
  { label: "LinkedIn", url: process.env.OWNER_LINKEDIN_URL || "" },
  { label: "Instagram", url: process.env.OWNER_INSTAGRAM_URL || "" },
].map((profile) => ({
  ...profile,
  url: /^https:\/\//i.test(profile.url) ? profile.url : "",
}));

export const site = {
  name: "Stratum Corporate Ltd.",
  shortName: "Stratum Corporate",
  description:
    "Stratum Corporate Ltd. in Abuja, Nigeria supports CAC company registration, corporate compliance, HR policies, trademarks, NAFDAC registration and market entry.",
  url: siteUrl(),
  logo: "/images/logo.png",
  email: process.env.OWNER_EMAIL || "",
  phone: process.env.OWNER_PHONE_NUMBER || "",
  whatsapp: process.env.OWNER_WHATSAPP_NUMBER || "",
  location: process.env.OWNER_LOCATION || "Abuja, Nigeria",
  city: process.env.OWNER_CITY || "Abuja",
  region: process.env.OWNER_REGION || "Federal Capital Territory",
  address:
    process.env.OWNER_OFFICE_ADDRESS ||
    "Plot 1611/1612 Oka-Akoko Street, Garki, Abuja, Nigeria",
  businessHours: process.env.OWNER_BUSINESS_HOURS || "",
  socialProfiles,
  socialLinks: socialProfiles.filter(({ url }) => Boolean(url)),
  industries: [] as string[],
  team: [] as { name: string; role: string; bio: string; image?: string }[],
  brand,
};
export const isProductionSite = canIndexSite();
