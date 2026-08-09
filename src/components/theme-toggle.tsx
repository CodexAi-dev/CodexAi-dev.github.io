"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * No `mounted` state and no effect: next-themes sets the `dark` class on
 * <html> before first paint, so CSS alone can pick the right icon. That avoids
 * both the hydration mismatch and the icon flash on load.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle colour theme"
      className="grid size-11 place-items-center rounded-md border border-line text-muted transition-colors hover:border-ink hover:text-ink sm:size-9"
    >
      <Moon className="size-[18px] dark:hidden" aria-hidden />
      <Sun className="hidden size-[18px] dark:block" aria-hidden />
    </button>
  );
}
