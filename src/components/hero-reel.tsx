import { ExternalLink, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import hero from "@/data/hero-reel.json";

/**
 * Autoplay only while in view; muted by default. Poster first, then stream.
 */
export function HeroReel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const on = Boolean(entry?.isIntersecting);
        setActive(on);
        if (on) {
          if (!video.src) {
            video.src = hero.src;
            video.load();
          }
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "120px", threshold: 0.15 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play().catch(() => undefined);
  }

  return (
    <div ref={rootRef} className="red-rim-strong relative overflow-hidden bg-black">
      <div className="relative aspect-[9/14] max-h-[32rem] w-full sm:aspect-[9/12] sm:max-h-none">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={hero.poster}
          muted
          loop
          playsInline
          preload="none"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/25" />

        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          <span className="border border-primary/50 bg-black/70 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-primary">
            Hero reel
          </span>
          <span className="border border-white/10 bg-black/70 px-2 py-1 font-mono text-[0.6rem] tabular-nums text-fg">
            {hero.views} views
          </span>
        </div>

        {!active ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex size-12 items-center justify-center rounded-full border border-primary/50 bg-black/60 text-primary">
              <Play className="size-5 fill-current pl-0.5" />
            </span>
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 space-y-3 p-4 sm:p-5">
          <p className="line-clamp-2 font-display text-lg font-bold leading-snug tracking-tight text-fg sm:text-xl">
            {hero.title}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="soft" onClick={toggleMute} type="button">
              {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
              {muted ? "Unmute" : "Mute"}
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href={hero.href} target="_blank" rel="noopener noreferrer">
                <Play className="size-3.5 fill-current text-primary" />
                Open on IG
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
