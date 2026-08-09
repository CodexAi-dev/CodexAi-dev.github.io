/**
 * Single source of truth for identity, contact details and social links.
 * Change a fact here and it updates everywhere on the site.
 */

export const site = {
  name: "Dilshan Janith",
  shortName: "Dilshan",
  role: "Full-stack developer & designer",
  tagline: "Full-stack developer & designer in Sri Lanka.",
  intro:
    "I design and build fast, dependable web products — from business websites and booking platforms to internal management systems. Founder of SiteLab Solutions.",
  location: "Hatton, Central Province, Sri Lanka",
  locationShort: "Hatton, Sri Lanka",
  url: "https://dilshanjanith.me",
  available: true,
  // Kept short: this renders in uppercase mono next to the portrait, where a
  // longer string clips on a 375px screen.
  availabilityNote: "Open to freelance & full-time work",

  // TODO(dilshan): confirm — the old site listed three different addresses.
  email: "shanjanith9@gmail.com",
  phone: "+94 77 92 99 274",
  phoneHref: "tel:+94779299274",
  whatsapp: "https://wa.me/94779299274",
  workingHours: "Mon – Fri, 9:00 AM – 6:00 PM (GMT+5:30)",

  socials: [
    { label: "GitHub", href: "https://github.com/CodexAi-dev", icon: "github" },
    // TODO(dilshan): replace with your real profile URLs, or delete the row.
    { label: "LinkedIn", href: "https://linkedin.com/in/dilshandev", icon: "linkedin" },
  ],
} as const;

export type Site = typeof site;
