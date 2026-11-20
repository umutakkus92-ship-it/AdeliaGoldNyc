/**
 * Company and storefront configuration.
 *
 * Values in [BRACKETS] are placeholders: replace them with verified information before launch.
 * The EIN, banking details and private company documents must never be placed in this file
 * or anywhere in the frontend.
 */

export const COMPANY = {
  legalName: "Winners Investment LLC",
  brand: "Adelia Gold & Jewellery",
  cityLine: "West New York, New Jersey, USA",
  // TODO(owner): replace with the verified registered address before launch.
  streetAddress: "[INSERT VERIFIED REGISTERED ADDRESS]",
  // TODO(owner): replace with real contact details.
  phone: "[INSERT PHONE NUMBER]",
  email: "[INSERT CUSTOMER SERVICE EMAIL]",
  hours: "[INSERT BUSINESS HOURS]",
  social: { instagram: "", pinterest: "", tiktok: "" },
} as const;

export const isPlaceholder = (v: string) => v.startsWith("[") && v.endsWith("]");

export const SLOGANS = {
  heritage: "Rooted in Heritage. Made for Generations.",
  legacy: "More Than Gold. A Legacy.",
  story: "Every Piece Tells a Story.",
} as const;

/** Rotating announcement bar. Only state what has been verified (see shipping notes in README). */
export const ANNOUNCEMENTS = [
  "Every piece listed with its karat and gram weight",
  "New: the Cuban link collection in 14K gold",
  "Talk to a jewelry specialist before you buy",
];

export type GroupKey = "women" | "men" | "engagement" | "pre-owned" | "watches" | "collections" | "investment";

export const GROUP_ENUM: Record<GroupKey, string> = {
  women: "WOMEN",
  men: "MEN",
  engagement: "ENGAGEMENT",
  "pre-owned": "PRE_OWNED",
  watches: "WATCHES",
  collections: "COLLECTIONS",
  investment: "INVESTMENT",
};

export interface GroupInfo {
  key: GroupKey;
  title: string;
  allLabel: string;
  intro: string;
  art: string;
  tone: "Yellow" | "White" | "Rose";
  metals: string[];
  showKarat: boolean;
  /** Investment gold & silver stays disabled until licensing and payment approvals are confirmed. */
  disabled?: boolean;
}

export const GROUPS: Record<GroupKey, GroupInfo> = {
  women: {
    key: "women",
    title: "Women",
    allLabel: "All women’s",
    intro: "Necklaces, rings, earrings and bracelets in 10K to 24K gold, each listed with its karat and gram weight.",
    art: "hoops",
    tone: "Yellow",
    metals: ["Yellow", "White", "Rose"],
    showKarat: true,
  },
  men: {
    key: "men",
    title: "Men",
    allLabel: "All men’s",
    intro: "Cuban, rope and Franco chains, signet rings and bracelets — solid gold, sold by weight.",
    art: "cuban",
    tone: "Yellow",
    metals: ["Yellow", "White", "Rose"],
    showKarat: true,
  },
  engagement: {
    key: "engagement",
    title: "Engagement",
    allLabel: "All engagement",
    intro: "Engagement rings and wedding bands for the moments that matter most.",
    art: "ring-solitaire",
    tone: "Yellow",
    metals: ["Yellow", "White", "Rose"],
    showKarat: true,
  },
  "pre-owned": {
    key: "pre-owned",
    title: "Pre-Owned",
    allLabel: "All pre-owned",
    intro:
      "Pre-owned gold jewelry, clearly labelled as pre-owned. Every listing states its condition grade, hallmark and inspection status, with detailed condition photographs.",
    art: "cubanbr",
    tone: "Yellow",
    metals: ["Yellow", "White", "Rose"],
    showKarat: true,
  },
  watches: {
    key: "watches",
    title: "Pre-Owned Watches",
    allLabel: "All watches",
    intro: "Fine timepieces with a history — each listed with its year, condition, case size and whether box and papers are included.",
    art: "watch",
    tone: "Yellow",
    metals: ["Yellow", "White", "Rose"],
    showKarat: false,
  },
  collections: {
    key: "collections",
    title: "Collections",
    allLabel: "All collections",
    intro: "Shop by karat, by what’s new, or by the pieces our clients choose most.",
    art: "set",
    tone: "Yellow",
    metals: ["Yellow", "White", "Rose"],
    showKarat: true,
  },
  investment: {
    key: "investment",
    title: "Investment Gold & Silver",
    allLabel: "All investment",
    intro: "Investment gold and silver is not yet available to purchase online.",
    art: "bars",
    tone: "Yellow",
    metals: ["Gold", "Silver"],
    showKarat: false,
    disabled: true,
  },
};

export interface NavItem {
  label: string;
  href: string;
  group?: GroupKey;
  disabled?: boolean;
}

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Women", href: "/women", group: "women" },
  { label: "Men", href: "/men", group: "men" },
  { label: "Engagement", href: "/engagement", group: "engagement" },
  { label: "Pre-Owned", href: "/pre-owned", group: "pre-owned" },
  { label: "Watches", href: "/watches", group: "watches" },
  { label: "Collections", href: "/collections", group: "collections" },
  { label: "Investment", href: "/investment", group: "investment", disabled: true },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact Us", href: "/contact" },
];

export const FOOTER_LINKS = {
  shop: [
    { label: "Women", href: "/women" },
    { label: "Men", href: "/men" },
    { label: "Engagement", href: "/engagement" },
    { label: "Pre-owned jewelry", href: "/pre-owned" },
    { label: "Pre-owned watches", href: "/watches" },
    { label: "Collections", href: "/collections" },
  ],
  care: [
    { label: "Contact us", href: "/contact" },
    { label: "Track my order", href: "/track-order" },
    { label: "Shipping policy", href: "/policies/shipping" },
    { label: "Returns & refunds", href: "/policies/returns" },
    { label: "Jewelry care", href: "/policies/care" },
    { label: "FAQ", href: "/policies/faq" },
  ],
  adelia: [
    { label: "Our story", href: "/our-story" },
    { label: "Privacy policy", href: "/policies/privacy" },
    { label: "Terms & conditions", href: "/policies/terms" },
  ],
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
