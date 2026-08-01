import { useEffect } from "react";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ACCENT_THEMES,
  type AccentId,
  syncAccentFromStorage,
  useThemeStore,
} from "@/lib/theme-store";

type ThemeSwitcherProps = {
  className?: string;
  /** denser control for tight headers */
  compact?: boolean;
};

/**
 * Client palette switcher — red / green / blue / orange on black.
 * Persists in localStorage so demos keep the last rim for the client.
 */
export function ThemeSwitcher({ className, compact = false }: ThemeSwitcherProps) {
  const accent = useThemeStore((s) => s.accent);
  const setAccent = useThemeStore((s) => s.setAccent);

  useEffect(() => {
    syncAccentFromStorage();
  }, []);

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-[var(--radius-md)] border border-border bg-surface/90 p-1",
        className,
      )}
      role="group"
      aria-label="Studio color palette"
    >
      {!compact && (
        <span className="hidden items-center gap-1 px-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-subtle sm:inline-flex">
          <Palette className="size-3 text-primary" aria-hidden />
          Palette
        </span>
      )}
      {ACCENT_THEMES.map((theme) => {
        const active = accent === theme.id;
        return (
          <button
            key={theme.id}
            type="button"
            title={`${theme.label} — ${theme.blurb}`}
            aria-label={`${theme.label} palette`}
            aria-pressed={active}
            onClick={() => setAccent(theme.id as AccentId)}
            className={cn(
              "group relative flex items-center gap-1.5 rounded-[var(--radius-sm)] px-1.5 py-1 transition-[background-color,box-shadow,transform] duration-[var(--motion-quick)]",
              active
                ? "bg-surface-3 shadow-[inset_0_0_0_1px_rgb(var(--accent-rgb)/0.55)]"
                : "hover:bg-surface-2",
            )}
          >
            <span
              className={cn(
                "size-3.5 rounded-full border border-black/60 shadow-[0_0_0_1px_rgb(255_255_255/0.12)] transition-transform duration-[var(--motion-quick)]",
                active && "scale-110 ring-2 ring-[rgb(var(--accent-rgb)/0.45)] ring-offset-1 ring-offset-bg",
              )}
              style={{ backgroundColor: theme.swatch }}
              aria-hidden
            />
            {!compact && (
              <span
                className={cn(
                  "hidden font-mono text-[0.62rem] uppercase tracking-[0.12em] sm:inline",
                  active ? "text-fg" : "text-subtle group-hover:text-muted",
                )}
              >
                {theme.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
