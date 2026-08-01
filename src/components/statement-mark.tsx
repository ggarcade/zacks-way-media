import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatementMarkProps = {
  className?: string;
  compact?: boolean;
};

/** Dual-layer line: solid plate underneath for legibility + clipped metal sheen on top */
function ChromeLine({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p className={cn("chrome-line relative", className)}>
      <span className="chrome-plate" aria-hidden>
        {children}
      </span>
      <span className="chrome-mark">{children}</span>
    </p>
  );
}

/**
 * Motorsports chrome lockup.
 * Metal sheen is painted INTO the glyphs (background-clip:text).
 * A solid plate layer underneath keeps mobile readable even when
 * the metal gradient is mid-sheen.
 */
export function StatementMark({ className, compact = false }: StatementMarkProps) {
  if (compact) {
    return (
      <div className={cn("chrome-sheen select-none", className)} aria-hidden>
        <p className="chrome-mark-sm text-[clamp(1.35rem,6vw,1.85rem)]">
          Signal over noise
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "chrome-sheen chrome-lean relative w-full max-w-full select-none px-2 text-center sm:overflow-x-clip sm:pl-4 sm:text-left",
        className,
      )}
    >
      <p className="mb-3 font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary sm:mb-2.5 sm:text-[0.65rem] sm:tracking-[0.28em] sm:text-xs">
        Zack's Way Media · Signature
      </p>
      <h1 className="sr-only">
        Signal over noise. Built for brands that move.
      </h1>
      <div
        aria-hidden
        className="chrome-lean-body mx-auto w-full max-w-full space-y-1.5 sm:mx-0 sm:translate-x-2 sm:space-y-0"
      >
        <ChromeLine className="text-[clamp(1.9rem,9.6vw,4.7rem)]">
          Signal over
        </ChromeLine>
        <ChromeLine className="text-[clamp(1.9rem,9.6vw,4.7rem)]">Noise</ChromeLine>
        <div className="mt-3 flex flex-col items-center gap-1.5 sm:mt-3 sm:flex-row sm:items-baseline sm:gap-3">
          <span className="hidden h-px w-8 bg-primary/70 sm:block" />
          <p className="chrome-mark-sm max-w-[18rem] px-1 text-[clamp(1rem,4.4vw,1.4rem)] tracking-tight sm:max-w-none">
            Built for brands that move
          </p>
        </div>
      </div>
    </div>
  );
}

export function StatementStage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "statement-stage overflow-x-clip border-b border-primary/30",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      {children}
    </div>
  );
}
