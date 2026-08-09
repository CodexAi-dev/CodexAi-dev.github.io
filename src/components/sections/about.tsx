import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/ui";
import { timeline } from "@/content/experience";
import { techGroups } from "@/content/tech";
import { site } from "@/content/site";

const principles = [
  {
    title: "Readable code over clever code",
    body: "Whoever maintains it next — including future me — should not need a tour.",
  },
  {
    title: "Design and build together",
    body: "No hand-off gap between the mockup and what actually ships.",
  },
  {
    title: "Straight answers on scope",
    body: "I'd rather tell you something will take three weeks than promise one.",
  },
];

export function About() {
  return (
    <Section id="about" tinted>
      <SectionHeading
        index="02"
        eyebrow="About"
        title="How I work, and what I've worked on."
      />

      <div className="mt-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div className="space-y-4 text-[0.9375rem] leading-relaxed text-muted">
            <p>
              I&apos;m a developer and designer based in {site.locationShort}. I build web
              applications end to end — the interface, the server, the database — and I do the
              design work myself, so what gets built matches what was drawn.
            </p>
            <p>
              Most of my work is for small and medium businesses: a booking platform, an online
              store, an internal system to replace a spreadsheet. The technology matters less than
              whether the thing is fast, clear to use, and maintainable after I hand it over.
            </p>
            <p>
              In 2023 I started{" "}
              <strong className="font-medium text-ink">SiteLab Solutions</strong> to take on that
              work properly, with a process behind it rather than one-off favours.
            </p>
          </div>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {principles.map((item) => (
              <li key={item.title} className="py-4">
                <h3 className="text-sm font-medium text-ink">{item.title}</h3>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div>
          <Reveal>
            <h3 className="meta border-b border-line pb-3">Experience &amp; education</h3>
          </Reveal>

          {/* Ruled rows rather than a dotted timeline — same hairline language
              as the rest of the page. */}
          <ol className="divide-y divide-line border-b border-line">
            {timeline.map((entry, i) => (
              <Reveal key={`${entry.org}-${entry.period}`} delay={i * 60} as="li">
                <div className="grid gap-2 py-6 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                  <p className="meta pt-1">{entry.period}</p>
                  <div>
                    <h4 className="text-[0.9375rem] font-medium text-ink">{entry.title}</h4>
                    <p className="mt-0.5 text-sm text-accent">{entry.org}</p>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                      {entry.description}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1">
                      {entry.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      {/* Tech — grouped honestly, no percentage bars */}
      <Reveal>
        <div className="mt-14 border-t border-line pt-10">
          <h3 className="meta">Tools &amp; technologies</h3>
          <div className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {techGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-medium text-ink">{group.title}</h4>
                <p className="mt-0.5 text-xs text-muted">{group.note}</p>
                <ul className="mt-3 flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
