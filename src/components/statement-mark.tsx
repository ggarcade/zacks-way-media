import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type StatementMarkProps = {
  className?: string;
  compact?: boolean;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/** 0 = imploded / assembled, 1 = exploded — same idea as the reels rail */
function stageProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const center = rect.top + rect.height * 0.5;
  const start = vh * 0.55;
  const end = -rect.height * 0.2;
  return clamp(1 - (center - end) / (start - end), 0, 1);
}

function useIsNarrow(breakpoint = 640) {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [breakpoint]);
  return narrow;
}

/**
 * Motorsports-style chrome lockup — the site's signature attention grabber.
 * Scroll: Signal sweeps L→R, Noise drifts one way, tagline follows softer.
 * Mobile: contained width + softer travel so nothing spills the viewport.
 */
export function StatementMark({ className, compact = false }: StatementMarkProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const narrow = useIsNarrow();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (compact || reduceMotion) {
      setP(0);
      return;
    }
    let raf = 0;
    const tick = () => {
      const el =
        rootRef.current?.closest<HTMLElement>(".statement-stage") ??
        rootRef.current;
      if (!el) return;
      setP(stageProgress(el));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [compact, reduceMotion]);

  if (compact) {
    return (
      <div className={cn("chrome-sheen select-none", className)} aria-hidden>
        <p className="chrome-mark-sm text-[clamp(1.2rem,5.5vw,1.85rem)]">
          Signal over noise
        </p>
      </div>
    );
  }

  const ease = 1 - Math.pow(1 - p, 2);
  // Desktop travel vs mobile (kept inside the column)
  const signalTravelIn = narrow ? 28 : 72;
  const signalTravelOut = narrow ? 8 : 18;
  const noiseTravelIn = narrow ? 8 : 12;
  const noiseTravelOut = narrow ? 20 : 56;
  const follow = narrow ? 0.35 : 0.4;

  const signalX = reduceMotion
    ? 0
    : -signalTravelIn * (1 - ease) + ease * signalTravelOut;
  const noiseX = reduceMotion
    ? 0
    : -noiseTravelIn * (1 - ease) + ease * noiseTravelOut;
  const tagX = reduceMotion ? 0 : noiseX * follow;
  const signalY = reduceMotion ? 0 : (1 - ease) * (narrow ? 4 : 10);
  const noiseY = reduceMotion ? 0 : ease * (narrow ? -3 : -6);
  const signalRot = reduceMotion
    ? 0
    : (1 - ease) * (narrow ? -1 : -2.5) + ease * (narrow ? 0.4 : 1);
  const noiseRot = reduceMotion
    ? 0
    : (1 - ease) * (narrow ? 0.6 : 1.5) + ease * (narrow ? -0.8 : -2);

  const motionStyle = (extra?: CSSProperties): CSSProperties => ({
    transition: reduceMotion ? undefined : "transform 90ms linear, opacity 90ms linear",
    willChange: reduceMotion ? undefined : "transform",
    ...extra,
  });

  return (
    <div
      ref={rootRef}
      className={cn(
        "chrome-sheen chrome-lean relative w-full max-w-full select-none overflow-x-clip text-center sm:text-left",
        className,
      )}
      data-statement-p={ease.toFixed(3)}
    >
      <p className="mb-2.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.22em] text-primary sm:tracking-[0.28em] sm:text-xs">
        Zack's Way Media · Signature
      </p>
      <h1 className="sr-only">
        Signal over noise. Built for brands that move.
      </h1>
      <div
        aria-hidden
        className="chrome-lean-body mx-auto w-full max-w-full space-y-0.5 overflow-x-clip sm:mx-0 sm:space-y-0"
      >
        <p
          className="chrome-mark text-[clamp(1.55rem,9.5vw,4.7rem)]"
          style={motionStyle({
            transform: `translate3d(${signalX}px, ${signalY}px, 0) rotate(${signalRot}deg)`,
            opacity: reduceMotion ? 1 : 0.55 + ease * 0.45,
          })}
        >
          Signal over
        </p>
        <p
          className="chrome-mark text-[clamp(1.55rem,9.5vw,4.7rem)]"
          style={motionStyle({
            transform: `translate3d(${noiseX}px, ${noiseY}px, 0) rotate(${noiseRot}deg)`,
            opacity: reduceMotion ? 1 : 0.6 + ease * 0.4,
          })}
        >
          Noise
        </p>
        <div
          className="mt-2.5 flex flex-col items-center gap-1 sm:mt-3 sm:flex-row sm:items-baseline sm:gap-3"
          style={motionStyle({
            transform: `translate3d(${tagX}px, ${noiseY * 0.5}px, 0)`,
            opacity: reduceMotion ? 1 : 0.5 + ease * 0.5,
          })}
        >
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
