import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/ui";
import { studio } from "@/content/services";

export function Studio() {
  return (
    <Section id="studio">
      <SectionHeading
        index="03"
        eyebrow="The studio"
        title={studio.name}
        lead={studio.summary}
      />

      <Reveal delay={60}>
        <dl className="mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-3">
          {studio.metrics.map((metric) => (
            <div
              key={metric.label}
              className="border-b border-line py-5 sm:border-r sm:last:border-r-0 sm:pl-5 sm:first:pl-0"
            >
              <dt className="meta">{metric.label}</dt>
              <dd className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Services as a ruled index rather than a grid of bordered boxes */}
      <ol className="mt-10 divide-y divide-line border-y border-line">
        {studio.services.map((service, i) => (
          <Reveal key={service.title} delay={i * 45} as="li">
            <div className="grid gap-1 py-5 sm:grid-cols-[3rem_1fr_1.1fr] sm:items-baseline sm:gap-6">
              <span className="meta">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[0.9375rem] font-medium text-ink">{service.title}</h3>
              <p className="text-[0.8125rem] leading-relaxed text-muted">{service.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={80}>
        <div className="mt-12 flex flex-col items-start gap-5 rounded-lg bg-ink px-6 py-8 text-bg sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h3 className="text-lg font-semibold sm:text-xl">Have a project in mind?</h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed opacity-75">
              Tell me what you&apos;re trying to build. I&apos;ll come back with an honest scope,
              a timeline and a price — usually within a day.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-bg px-6 text-sm font-medium text-ink transition-opacity hover:opacity-85 sm:w-auto"
          >
            Start a conversation
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
