/**
 * Grouped by how confidently you'd take paid work in it.
 * Deliberately no percentage bars — self-assigned scores read as arbitrary,
 * and a low number ("Docker 10%") only ever counts against you.
 */

export type TechGroup = {
  title: string;
  note: string;
  items: string[];
};

export const techGroups: TechGroup[] = [
  {
    title: "Core stack",
    note: "What I reach for on client work",
    items: [
      "PHP",
      "JavaScript",
      "HTML5 & CSS3",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Bootstrap",
      "Laravel",
      "MySQL",
    ],
  },
  {
    title: "Also work with",
    note: "Used on real projects",
    items: [
      "Java",
      "JavaFX",
      "Python",
      "C#",
      ".NET",
      "MS SQL Server",
      "REST APIs",
      "Git & GitHub",
    ],
  },
  {
    title: "Design",
    note: "Design and hand-off",
    items: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Brand identity", "UI systems"],
  },
  {
    title: "Currently learning",
    note: "Not yet offered as a service",
    items: ["Django", "Flask", "GraphQL", "Docker", "AWS"],
  },
];
