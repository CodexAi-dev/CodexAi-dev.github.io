import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

export function Section({
  id,
  children,
  className,
  tinted = false,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-16 py-16 sm:scroll-mt-20 sm:py-20 md:py-24",
        tinted && "border-y border-line bg-bg-subtle",
        className,
      )}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

/**
 * Numbered section headers. The index sits in mono against a rule, which is
 * what gives the page its spine — the same device repeats at every section.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal>
      <div className="flex items-center gap-3 border-b border-line pb-3">
        <span className="meta text-ink">{index}</span>
        <span className="meta">{eyebrow}</span>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
        <h2 className="max-w-2xl text-[1.625rem] leading-[1.2] sm:text-[2rem] md:text-[2.375rem]">
          {title}
        </h2>
        {lead ? (
          <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">{lead}</p>
        ) : null}
      </div>
    </Reveal>
  );
}
