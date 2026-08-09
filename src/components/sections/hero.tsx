import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

const facts = [
  { label: "Based in", value: site.locationShort },
  { label: "Experience", value: "2+ years" },
  { label: "Studio", value: "SiteLab Solutions" },
  { label: "Focus", value: "Web apps & systems" },
];

export function Hero() {
  return (
    /* No decorative blur, no gradient. The only shapes on the page are the
       portrait and the rules. */
    <section id="top" className="pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-14">
      <div className="shell">
        <div className="flex items-center gap-4">
          <div className="relative size-14 shrink-0 sm:size-16">
            <div className="size-full overflow-hidden rounded-full border border-line bg-bg-subtle">
              <Image
                src="/pro-image.png"
                alt={`Portrait of ${site.name}`}
                width={320}
                height={436}
                priority
                sizes="64px"
                /* Face sits in the upper third of the source photo, so the
                   circular crop is anchored high rather than centred. */
                className="size-full object-cover object-[50%_20%]"
              />
            </div>
            {site.available ? (
              /* 9% inset puts the dot on the circle's 45° edge at any size */
              <span
                aria-hidden
                className="absolute bottom-[9%] right-[9%] size-2.5 rounded-full border-2 border-bg bg-accent"
              />
            ) : null}
          </div>

          <div className="min-w-0">
            <p className="text-[0.9375rem] font-medium text-ink">{site.name}</p>
            {site.available ? (
              <p className="meta mt-0.5 leading-relaxed">{site.availabilityNote}</p>
            ) : null}
          </div>
        </div>

        <Reveal delay={40}>
          <h1 className="mt-7 max-w-4xl text-[2rem] leading-[1.14] sm:mt-9 sm:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.1]">
            Full-stack developer and designer building web products for small
            businesses in Sri Lanka.
          </h1>
        </Reveal>

        <Reveal delay={90}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{site.intro}</p>
        </Reveal>

        <Reveal delay={130}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#work"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-ink px-6 text-sm font-medium text-bg transition-opacity hover:opacity-85 sm:w-auto"
            >
              See selected work
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-line px-6 text-sm font-medium transition-colors hover:border-ink sm:w-auto"
            >
              Email me
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </Reveal>

        <Reveal delay={170}>
          {/* Facts sit in a ruled row — the same hairline language as the
              section headers, so the page reads as one system. */}
          <dl className="mt-10 grid grid-cols-2 border-t border-line sm:mt-12 sm:grid-cols-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="border-b border-line py-4 pr-4 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:pl-4 sm:first:pl-0"
              >
                <dt className="meta">{fact.label}</dt>
                <dd className="mt-1.5 text-sm text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
