import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatementMarkProps = {
  className?: string;
  compact?: boolean;
};

/**
 * Motorsports chrome lockup — static (no scroll-linked re-renders).
 * Performance: GPU-light; no per-frame React state.
 */
export function StatementMark({ className, compact = false }: StatementMarkProps) {
  if (compact) {
    return (
      <div className={cn("chrome-sheen select-none", className)} aria-hidden>
        <p className="chrome-mark-sm text-[clamp(1.2rem,5.5vw,1.85rem)]">
          Signal over noise
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "chrome-sheen chrome-lean relative w-full max-w-full select-none overflow-x-clip text-center sm:pl-4 sm:text-left",
        className,
      )}
    >
      <p className="mb-2.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.22em] text-primary sm:tracking-[0.28em] sm:text-xs">
        Zack's Way Media · Signature
      </p>
      <h1 className="sr-only">
        Signal over noise. Built for brands that move.
      </h1>
      <div
        aria-hidden
        className="chrome-lean-body mx-auto w-full max-w-full space-y-0.5 overflow-x-clip sm:mx-0 sm:translate-x-2 sm:space-y-0"
      >
        <p className="chrome-mark text-[clamp(1.55rem,9.5vw,4.7rem)]">
          Signal over
        </p>
        <p className="chrome-mark text-[clamp(1.55rem,9.5vw,4.7rem)]">Noise</p>
        <div className="mt-2.5 flex flex-col items-center gap-1 sm:mt-3 sm:flex-row sm:items-baseline sm:gap-3">
          <span className="hidden h-px w-8 bg-primary/70 sm:block" />
          <p className="chrome-mark-sm px-1 text-[clamp(0.8rem,3.6vw,1.4rem)] tracking-tight">
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
