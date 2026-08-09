import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { site } from "@/content/site";

const socialIcons = { github: GithubIcon, linkedin: LinkedinIcon } as const;

const columns = [
  {
    title: "Site",
    links: [
      { label: "Work", href: "#work" },
      { label: "About", href: "#about" },
      { label: "Studio", href: "#studio" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Website development", href: "#studio" },
      { label: "E-commerce & booking", href: "#studio" },
      { label: "Management systems", href: "#studio" },
      { label: "UI/UX & brand design", href: "#studio" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell py-12">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-[0.9375rem] font-semibold tracking-tight">
              {site.shortName}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {site.role} in {site.locationShort}. Building web products that stay fast and stay
              maintainable.
            </p>
            <div className="mt-5 flex gap-2">
              {site.socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-md border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="meta">{column.title}</h2>
              <ul className="mt-3 space-y-1.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block py-1 text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="meta">Contact</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-block break-all py-1 text-muted transition-colors hover:text-ink"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-block py-1 text-muted transition-colors hover:text-ink"
                >
                  {site.phone}
                </a>
              </li>
              <li className="py-1 text-muted">{site.locationShort}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="meta">Next.js · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
