export const studio = {
  name: "SiteLab Solutions",
  // TODO(dilshan): confirm — old site said 2020 in one section and 2023 in another.
  founded: "2023",
  summary:
    "A small web development studio working with businesses across Sri Lanka and abroad. Custom websites, online stores and internal systems — built properly, handed over clean.",
  metrics: [
    { value: "30+", label: "Projects delivered" },
    { value: "25+", label: "Clients served" },
    { value: "2+", label: "Years in business" },
  ],
  services: [
    {
      title: "Custom website development",
      description: "Built from scratch around your business, not a bought template.",
    },
    {
      title: "E-commerce & booking",
      description: "Online stores and reservation systems with payments wired up.",
    },
    {
      title: "Management systems",
      description: "Internal tools for stock, staff, bookings and reporting.",
    },
    {
      title: "UI/UX & brand design",
      description: "Interface design, logo and identity work, delivered dev-ready.",
    },
    {
      title: "SEO & performance",
      description: "Fast pages, clean markup and the technical basics search engines want.",
    },
    {
      title: "Maintenance & support",
      description: "Ongoing updates, backups and fixes after launch.",
    },
  ],
} as const;
