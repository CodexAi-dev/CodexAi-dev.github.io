"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { GithubIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/ui";
import { projects, type Project } from "@/content/projects";
import { cn } from "@/lib/cn";

const motionOk = () =>
  typeof window === "undefined" ||
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group flex w-[15rem] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-200 hover:border-ink/30 sm:w-[16.5rem] lg:w-[18rem]">
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — ${project.category}`}
            fill
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 264px, 288px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-mono text-2xl text-muted">
              {project.initials ?? project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <span className="meta absolute left-2.5 top-2.5 rounded bg-bg/85 px-1.5 py-0.5 text-ink backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="meta truncate">{project.category}</span>
          <span className="meta shrink-0">{project.year}</span>
        </div>

        <h3 className="mt-2 text-[0.9375rem] leading-snug">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-[0.8125rem] leading-relaxed text-muted">
          {project.summary}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-4 pt-4">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 py-1.5 text-[0.8125rem] font-medium text-accent underline-offset-4 hover:underline"
            >
              Visit
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          ) : null}
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 py-1.5 text-[0.8125rem] text-muted transition-colors hover:text-ink"
            >
              <GithubIcon className="size-3.5" />
              Source
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [nav, setNav] = useState({ prev: false, next: true, active: 0 });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    if (kids.length === 0) return;

    const step = kids.length > 1 ? kids[1].offsetLeft - kids[0].offsetLeft : kids[0].offsetWidth;
    const max = el.scrollWidth - el.clientWidth;
    const atEnd = el.scrollLeft >= max - 4;

    setNav({
      prev: el.scrollLeft > 4,
      next: !atEnd,
      // At max scroll the track can't advance further, so scrollLeft/step
      // under-reports: it would sit on card 3 while card 6 is on screen.
      // Pin to the last index whenever we're against the end stop.
      active: atEnd
        ? kids.length - 1
        : step > 0
          ? Math.min(kids.length - 1, Math.round(el.scrollLeft / step))
          : 0,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    el.addEventListener("scroll", schedule, { passive: true });
    // ResizeObserver fires once on observe, which gives us the initial
    // measurement without a synchronous setState inside the effect body.
    const ro = new ResizeObserver(schedule);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", schedule);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [measure]);

  const step = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    const delta = kids.length > 1 ? kids[1].offsetLeft - kids[0].offsetLeft : el.clientWidth;
    el.scrollBy({ left: dir * delta, behavior: motionOk() ? "smooth" : "auto" });
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    if (!kids[i]) return;
    el.scrollTo({
      left: kids[i].offsetLeft - kids[0].offsetLeft,
      behavior: motionOk() ? "smooth" : "auto",
    });
  };

  return (
    <Section id="work">
      <SectionHeading
        index="01"
        eyebrow="Selected work"
        title="Client platforms, internal systems and design work."
        lead="Six projects from the last two years. Happy to walk through any of them in detail."
      />

      <Reveal delay={60}>
        {/* Controls sit above the track: counter on the left, arrows on the
            right, matching the ruled header above. */}
        <div className="mt-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="meta text-ink">
              {String(nav.active + 1).padStart(2, "0")}
            </span>
            <span className="meta">/ {String(projects.length).padStart(2, "0")}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={!nav.prev}
              aria-label="Previous project"
              className="grid size-10 place-items-center rounded-md border border-line text-ink transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={!nav.next}
              aria-label="Next project"
              className="grid size-10 place-items-center rounded-md border border-line text-ink transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>

        {/* Full-bleed track. Negative margins match .shell padding at each
            breakpoint so card edges align with the grid, and scroll-px keeps
            snap points aligned to that same edge. */}
        <div
          ref={trackRef}
          role="group"
          aria-label="Projects, scrollable"
          tabIndex={0}
          className={cn(
            "no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 scroll-px-5",
            "sm:-mx-7 sm:gap-4 sm:px-7 sm:scroll-px-7",
            "md:-mx-10 md:px-10 md:scroll-px-10",
          )}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Segmented progress — doubles as direct navigation */}
        <div className="mt-5 flex items-center gap-1.5">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${project.title}`}
              aria-current={nav.active === i ? "true" : undefined}
              className="flex h-6 w-8 items-center"
            >
              <span
                className={cn(
                  "h-px w-full transition-colors duration-300",
                  nav.active === i ? "bg-ink" : "bg-line",
                )}
              />
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-12 flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            More repositories and experiments live on GitHub.
          </p>
          <a
            href="https://github.com/CodexAi-dev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-line px-5 text-sm font-medium transition-colors hover:border-ink sm:w-auto"
          >
            <GithubIcon className="size-4" />
            View GitHub profile
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
