import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Instagram,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import reels from "@/data/instagram-reels.json";
import { cn } from "@/lib/utils";

function formatViews(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function sectionBurst(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const center = rect.top + rect.height * 0.45;
  const start = vh * 0.92;
  const end = vh * 0.22;
  return clamp(1 - (center - end) / (start - end), 0, 1);
}

export function ReelsCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [active, setActive] = useState(0);
  const [burst, setBurst] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [narrow, setNarrow] = useState(false);

  const updateNav = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 8);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 8);
    const card = el.querySelector<HTMLElement>("[data-reel-card]");
    if (card) {
      const gap = 12;
      const idx = Math.round(scrollLeft / (card.offsetWidth + gap));
      setActive(Math.max(0, Math.min(reels.length - 1, idx)));
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nq = window.matchMedia("(max-width: 639px)");
    const apply = () => {
      setReduceMotion(mq.matches);
      setNarrow(nq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    nq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      nq.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateNav();
    el.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    return () => {
      el.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, [updateNav]);

  useEffect(() => {
    if (reduceMotion) {
      setBurst(0);
      return;
    }
    let raf = 0;
    const tick = () => {
      const section = sectionRef.current;
      if (!section) return;
      setBurst(sectionBurst(section));
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
  }, [reduceMotion]);

  function scrollByDir(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-reel-card]");
    const amount = card ? card.offsetWidth + 12 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  const mid = (reels.length - 1) / 2;
  const ease = 1 - Math.pow(1 - burst, 2.2);
  // Softer fan on phones so cards stay tappable in the rail
  const spreadX = narrow ? 10 : 28;
  const spreadY = narrow ? 4 : 10;
  const spreadRot = narrow ? 1.2 : 3.5;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="scroll-mt-20 overflow-x-clip border-b border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="mb-6 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="section-label mb-3">Instagram · Top reels</p>
            <h2 className="headline text-[clamp(1.75rem,6vw,3.25rem)]">
              Most-viewed work
              <span className="text-primary"> on the feed.</span>
            </h2>
            <p className="lede mt-3 text-sm sm:mt-4">
              Live from @zacks_way_media — ranked by views. Swipe the rail, or
              scroll the page and watch it open up.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous reels"
              disabled={!canPrev}
              onClick={() => scrollByDir(-1)}
              className="size-11 disabled:opacity-30 sm:size-9"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next reels"
              disabled={!canNext}
              onClick={() => scrollByDir(1)}
              className="size-11 disabled:opacity-30 sm:size-9"
            >
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="soft"
              size="sm"
              className="ml-0 h-11 sm:ml-1 sm:h-9"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/zacks_way_media/",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              <Instagram className="size-3.5" />
              Full profile
            </Button>
          </div>
        </div>

        <div
          className="reels-burst-stage relative -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ ["--burst" as string]: String(ease) } as CSSProperties}
        >
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-6 pt-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-label="Top Instagram reels carousel"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") scrollByDir(1);
              if (e.key === "ArrowLeft") scrollByDir(-1);
            }}
          >
            {reels.map((reel, i) => {
              const dist = i - mid;
              const tx = reduceMotion ? 0 : dist * ease * spreadX;
              const ty = reduceMotion ? 0 : Math.abs(dist) * ease * -spreadY;
              const rot = reduceMotion ? 0 : dist * ease * spreadRot;
              const sc = reduceMotion ? 1 : narrow ? 0.97 + ease * 0.04 : 0.94 + ease * 0.1;
              const op = reduceMotion ? 1 : 0.78 + ease * 0.22;

              return (
                <a
                  key={reel.shortcode}
                  data-reel-card
                  href={reel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative w-[min(72vw,16.5rem)] shrink-0 snap-start overflow-hidden border border-border bg-surface will-change-transform sm:w-[18.5rem]",
                    i === 0 && "red-rim",
                    "transition-[border-color,box-shadow] duration-[var(--motion-fast)] hover:border-primary/55 hover:shadow-red",
                  )}
                  style={{
                    transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(${sc})`,
                    opacity: op,
                    transition: reduceMotion
                      ? undefined
                      : "transform 80ms linear, opacity 80ms linear",
                    zIndex: 10 - Math.abs(Math.round(dist)),
                  }}
                >
                  <div className="relative aspect-[9/14] overflow-hidden bg-surface-2">
                    <img
                      src={reel.thumb}
                      alt={reel.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                    <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
                      <span className="border border-primary/50 bg-black/55 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-primary backdrop-blur-sm">
                        #{reel.rank}
                      </span>
                      <span className="inline-flex items-center gap-1 border border-white/10 bg-black/55 px-2 py-1 font-mono text-[0.6rem] tabular-nums text-fg backdrop-blur-sm">
                        <Eye className="size-3 text-primary" />
                        {formatViews(reel.views)}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex size-12 items-center justify-center rounded-full border border-primary/60 bg-black/55 text-fg shadow-red backdrop-blur-sm transition-transform duration-[var(--motion-fast)] group-hover:scale-110 sm:size-14">
                        <Play className="size-5 fill-current pl-0.5 text-primary" />
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 space-y-2 p-3.5 sm:p-4">
                      <p className="line-clamp-2 font-display text-base font-bold leading-snug tracking-tight text-fg sm:text-lg">
                        {reel.title}
                      </p>
                      <div className="flex items-center justify-between gap-2 text-[0.65rem] text-muted">
                        <span className="font-mono uppercase tracking-[0.12em]">
                          Open on IG
                        </span>
                        <ExternalLink className="size-3.5 text-primary" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-1 flex items-center justify-center gap-1.5">
          {reels.map((reel, i) => (
            <button
              key={reel.shortcode}
              type="button"
              aria-label={`Go to reel ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-[var(--motion-fast)]",
                i === active
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-border-strong hover:bg-muted",
              )}
              onClick={() => {
                const el = scrollerRef.current;
                const card =
                  el?.querySelectorAll<HTMLElement>("[data-reel-card]")[i];
                card?.scrollIntoView({
                  behavior: "smooth",
                  inline: "start",
                  block: "nearest",
                });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
