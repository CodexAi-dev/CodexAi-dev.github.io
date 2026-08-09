"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        // The open mobile sheet needs an opaque bar above it, even at scroll 0.
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75"
          : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-14 items-center justify-between gap-4 sm:h-16">
        <a href="#top" className="-my-2 py-2 text-[0.9375rem] font-semibold tracking-tight">
          {site.shortName}
          <span className="text-accent">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={cn(
                "relative py-1 text-sm transition-colors",
                active === link.href ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300",
                  active === link.href ? "w-full" : "w-0",
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden h-9 items-center rounded-md bg-ink px-4 text-[0.8125rem] font-medium text-bg transition-opacity hover:opacity-85 md:inline-flex"
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-md border border-line text-ink md:hidden"
          >
            {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>
      </div>

      {/* Capped to the viewport so it scrolls rather than spilling off a short screen */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-t border-line bg-bg md:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col py-2 pb-5">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3 border-b border-line py-3.5 text-base text-ink last:border-0"
            >
              <span className="meta">{String(i + 1).padStart(2, "0")}</span>
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-ink px-6 text-sm font-medium text-bg"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
