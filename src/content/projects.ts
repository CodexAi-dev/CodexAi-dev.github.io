export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  tags: string[];
  image?: string;
  /** Shown when there is no screenshot yet. */
  initials?: string;
  live?: string;
  repo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ceyxcape",
    title: "Ceyxcape",
    category: "Booking platform",
    year: "2026",
    summary:
      "A tours and travel platform for Sri Lanka with online booking, payment handling, an admin panel and order tracking.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/projects/ceyxcape.png",
    repo: "https://github.com/CodexAi-dev/ceyxcape-app",
    featured: true,
  },
  {
    slug: "homs",
    title: "HOMS",
    category: "Management system",
    year: "2026",
    summary:
      "Hotel Operations Management System — reservations, room and housekeeping status, billing and staff roles in one internal tool.",
    tags: ["Full-stack", "Dashboard", "Private repo"],
    initials: "HO",
    featured: true,
  },
  {
    slug: "devmarket",
    title: "DevMarket",
    category: "Web application",
    year: "2025",
    summary:
      "A freelancing marketplace for developers with project listings, a bidding flow and public profiles. Mobile-first throughout.",
    tags: ["Next.js", "PostgreSQL", "Tailwind"],
    image: "/projects/devmarket.jpg",
    repo: "https://github.com/CodexAi-dev/devmarket",
  },
  {
    slug: "depot-management",
    title: "Depot Management & GPS Tracking",
    category: "Management system",
    year: "2025",
    summary:
      "Fleet and depot operations with live bus tracking, real-time metrics, custom reports and exports. Final-year diploma project.",
    tags: ["Java", "JavaFX", "MS SQL Server"],
    image: "/projects/depot-system.jpg",
    repo: "https://github.com/CodexAi-dev/DepotManagementSystem",
  },
  {
    slug: "fitness-app",
    title: "Fitness Tracking App",
    category: "UI/UX design",
    year: "2025",
    summary:
      "Mobile app design covering onboarding, workout logging and progress views, delivered as a reusable component library.",
    tags: ["Figma", "Design system", "Mobile"],
    image: "/projects/fitness-app.jpg",
  },
  {
    slug: "cybex-branding",
    title: "Cybex Brand Identity",
    category: "Brand design",
    year: "2025",
    summary:
      "Full identity for a technology startup — logo, stationery, colour and type system, and brand usage guidelines.",
    tags: ["Illustrator", "Photoshop", "Branding"],
    image: "/projects/cybex-branding.jpg",
  },
];
