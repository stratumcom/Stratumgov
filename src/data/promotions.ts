export const promotions = [
  {
    id: "offer-1",
    title: "Register 2 Companies, Get 1 Business Name Free",
    description:
      "The two 1 Million Naira share capital companies must be processed simultaneously. The complimentary Business Name requirements must be submitted alongside the requirements for the two companies.",
    serviceSlug: "company-formation-market-entry",
  },
  {
    id: "offer-2",
    title: "Buy 1 Company, Get a Free Tax Certificate",
    description:
      "This covers the processing and extraction of your initial NRS Tax Identification & Certificate only.",
    serviceSlug: "company-formation-market-entry",
  },
  {
    id: "offer-3",
    title: "Buy 4 Companies, Get 1 Free SCUML Certificate",
    description:
      "The complimentary Special Control Unit Against Money Laundering (SCUML) certificate will be processed for one designated eligible company within the bundle.",
    serviceSlug: "company-formation-market-entry",
  },
  {
    id: "offer-4",
    title: "Buy 2 NGOs/Churches, Get 1 Free SCUML",
    description:
      "The free SCUML application applies strictly to one of the two registered Trustee organizations, provided the entity falls under a designated non-financial institution bracket.",
    serviceSlug: "company-formation-market-entry",
  },
  {
    id: "offer-5",
    title:
      "Trademark Bundle (Buy 5, Get a 6th for no professional fee payment)",
    description:
      "All 5 trademarks must be submitted under the same intellectual property title or by the same applicant within a single transaction window to activate the free professional fee discount on the 6th filing.",
    serviceSlug: "intellectual-property-protection",
  },
  {
    id: "offer-6",
    title: "Annual Returns Backlog Discount",
    description:
      "The promotional discount applies strictly to the professional processing fees for companies clearing an active backlog exceeding 5 consecutive outstanding years. All statutory accumulated CAC penalty fees must be paid in full by the client.",
    serviceSlug: "statutory-compliance-maintenance",
  },
];
export const promotionTerms = [
  {
    title: "Validity Window",
    description:
      "This promotion is valid for a maximum duration of six (6) months calculated precisely from the date of the last technical or content update made to this website.",
  },
  {
    title: "Right of Immediate Withdrawal",
    description:
      "Stratum Governance Ltd explicitly reserves the right to suspend, alter, or completely withdraw any of these promotional offers at any time at its sole discretion. This withdrawal takes effect immediately upon management decision and remains legally binding on all new applications, even if the website text or promotional banners have not yet been updated, edited, or removed from the live portal.",
  },
  {
    title: "Exclusion of Statutory Fees",
    description:
      'Free offers cover our professional handling and service fees only. All official government portal fees, Corporate Affairs Commission (CAC) filing fees, and Federal Inland Revenue Service (FIRS) stamp duties for the "free" or discounted items must be paid in full by the client.',
  },
  {
    title: "Non-Transferable",
    description:
      "Free or discounted registrations cannot be traded for cash, applied as credit to unrelated corporate tasks, or transferred to third-party accounts.",
  },
];

// Update this date whenever website technical or content changes are released.
export const websiteLastUpdated = "2026-10-17";
export const promotionsEnabled = true;
export function promotionWindow(now = new Date()) {
  const starts = new Date(`${websiteLastUpdated}T00:00:00+01:00`);
  const ends = new Date(starts);
  ends.setUTCMonth(ends.getUTCMonth() + 6);
  return {
    starts,
    ends,
    active: promotionsEnabled && now >= starts && now < ends,
  };
}
