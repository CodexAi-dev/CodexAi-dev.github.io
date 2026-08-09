export type TimelineEntry = {
  kind: "work" | "education";
  period: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
};

/**
 * NOTE: the old site listed "Founder (2023–Present)" and "Senior Web Developer
 * (2023–2025)" at the same company at the same time, which reads as padding.
 * Merged into one honest entry.
 */
export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    period: "2023 — Present",
    title: "Founder & Lead Developer",
    org: "SiteLab Solutions",
    description:
      "Run a small web development studio: scoping work with clients, building the front and back end, and handing over sites the client can actually maintain.",
    tags: ["Full-stack", "Client delivery", "Project management"],
  },
  {
    kind: "education",
    period: "2023 — 2025",
    title: "Diploma in Information & Communication Technology",
    org: "College of Technology, Kandy",
    description:
      "Software programming and web technologies. Final-year project: a depot management and GPS bus-tracking system.",
    tags: ["Web development", "Java", "Databases", "Networking"],
  },
  {
    kind: "education",
    period: "2018 — 2019",
    title: "Diploma in Information Technology (International)",
    org: "Esoft Metro Campus",
    description:
      "IT fundamentals, hardware and networking, and programming in Python and C#. Final-year project: a hospital management system.",
    tags: ["Python", "C#", "Hardware", "Networking"],
  },
];
