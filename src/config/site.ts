import { brand } from "./brand";

export function siteUrl() {
  const deploymentDomain =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
      : process.env.VERCEL_URL;
  return deploymentDomain
    ? new URL(`https://${deploymentDomain}`).origin
    : "http://localhost:3000";
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
  name: "Stratum Governance Ltd.",
  shortName: "stratumgov",
  description:
    "Company formation, market entry, institutional management, intellectual property and regulatory compliance for Nigerian businesses and international investors.",
  url: siteUrl(),
  logo: "/icons/mark.svg",
  email: process.env.OWNER_EMAIL || "",
  phone: process.env.OWNER_PHONE_NUMBER || "",
  whatsapp: process.env.OWNER_WHATSAPP_NUMBER || "",
  location: process.env.OWNER_LOCATION || "",
  address: process.env.OWNER_OFFICE_ADDRESS || "",
  businessHours: process.env.OWNER_BUSINESS_HOURS || "",
  socialProfiles,
  socialLinks: socialProfiles.filter(({ url }) => Boolean(url)),
  industries: [] as string[],
  team: [] as { name: string; role: string; bio: string; image?: string }[],
  brand,
};
export const isProductionSite = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production" &&
    new URL(site.url).hostname !== "localhost"
  : !new URL(site.url).hostname.match(/^(localhost|127\.0\.0\.1)$/);
