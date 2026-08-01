import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  Clapperboard,
  ExternalLink,
  Instagram,
  MapPin,
  Pencil,
  Settings2,
  Sparkles,
  Target,
  Video,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SetupDialog } from "@/components/setup-dialog";
import { ReelsCarousel } from "@/components/reels-carousel";
import { HeroReel } from "@/components/hero-reel";
import { StatementMark, StatementStage } from "@/components/statement-mark";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { instagramUrl, useProfileStore } from "@/lib/profile-store";
import { cn } from "@/lib/utils";

const CAPABILITIES = [
  {
    index: "01",
    title: "Brand films",
    blurb:
      "Short-form narrative and product films that feel premium without the agency tax.",
    icon: Video,
  },
  {
    index: "02",
    title: "Social systems",
    blurb:
      "Reels, carousels, and content calendars built for retention — not just reach.",
    icon: Clapperboard,
  },
  {
    index: "03",
    title: "Campaign visuals",
    blurb:
      "Launch kits, stills, and motion assets with a consistent visual language.",
    icon: Wand2,
  },
  {
    index: "04",
    title: "Creative direction",
    blurb:
      "Positioning, art direction, and on-set guidance so every frame earns its place.",
    icon: Target,
  },
];

const PROOF_META = [
  { label: "Based in", value: "Lynchburg, VA" },
  { label: "Channel", value: "@zacks_way_media" },
  { label: "Focus", value: "Clients & creators" },
  { label: "Tone", value: "Corporate · edgy" },
];

const CASE_STUDIES = [
  {
    tag: "Merch drop",
    title: "6D6 red-shirt launch",
    result: "Feed-ready cutdowns + night energy that matches the brand.",
    detail: "Wheelie-led reel language, merch CTA, same red system as the drop.",
    thumb: "/ig/reel-2.jpg",
  },
  {
    tag: "Local scene",
    title: "Lynchburg night riders",
    result: "City-after-dark coverage that feels like the ride, not a brochure.",
    detail: "Street pace, pack shots, Hill City identity baked into the frame.",
    thumb: "/ig/reel-4.jpg",
  },
  {
    tag: "Product / auto",
    title: "Sports car stills + motion",
    result: "Clean product hero frames with enough grit for social.",
    detail: "Shoot + grade for dual use: grid posts and vertical cutdowns.",
    thumb: "/ig/reel-3.jpg",
  },
];

const PACKAGES = [
  {
    name: "Social sprint",
    price: "From $750",
    blurb: "A tight batch of reels + stills for a launch week or content push.",
    includes: ["3–5 vertical edits", "Captions + cover frames", "1 revision round"],
  },
  {
    name: "Brand film",
    price: "From $2,500",
    blurb: "Hero piece for site, ads, or pitch — plus social cutdowns.",
    includes: ["Direction + shoot day", "Master edit + grade", "3 vertical cutdowns"],
    featured: true,
  },
  {
    name: "Day / event",
    price: "Custom day rate",
    blurb: "Rides, drops, pop-ups, meetups — coverage that keeps the energy.",
    includes: ["Half or full day", "Highlight reel", "Select stills pack"],
  },
];

const WORKED_WITH = [
  "6 Dirty Six",
  "Local riders",
  "Merch drops",
  "Hill City brands",
  "Event coverage",
  "Creators",
];

const SHOT_IN = [
  "Lynchburg",
  "Night streets",
  "Shop floors",
  "Merch sets",
  "Open road",
  "Travel OK",
];

const BRIEF_CHECKLIST = [
  "Name + best contact channel",
  "Instagram / social handles",
  "Project type + platforms",
  "Budget band (even if TBD)",
  "When it needs to be live",
  "2–3 reference looks",
];

const PROCESS = [
  {
    step: "01",
    title: "Brief",
    body: "Goals, audience, and non-negotiables — tight intake, no fluff.",
  },
  {
    step: "02",
    title: "Direction",
    body: "Mood, type, and motion language locked before a single frame is shot.",
  },
  {
    step: "03",
    title: "Produce",
    body: "Shoot, edit, grade. Fast cycles with clear approval points.",
  },
  {
    step: "04",
    title: "Ship",
    body: "Platform-ready deliverables and a handoff your team can run with.",
  },
];

const BEHIND = [
  { src: "/ig/reel-1.jpg", label: "Pack energy" },
  { src: "/ig/reel-5.jpg", label: "Street takeover" },
  { src: "/ig/reel-6.jpg", label: "636 dirty" },
  { src: "/ig/hero-poster.jpg", label: "Hero frame" },
];

export function KidHome() {
  const profile = useProfileStore();
  const [hydrated, setHydrated] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const ig = useMemo(() => instagramUrl(profile.handle), [profile.handle]);
  const name = profile.displayName.trim() || "Zack's Way Media";

  function openInstagram() {
    if (!ig) {
      toast.message("Instagram handle missing");
      setEditOpen(true);
      return;
    }
    window.open(ig, "_blank", "noopener,noreferrer");
  }

  function copyHandle() {
    if (!profile.handle) return;
    void navigator.clipboard.writeText(`@${profile.handle}`);
    toast.success("Copied", { description: `@${profile.handle}` });
  }

  function copyBriefChecklist() {
    const text = [
      "Book Zack's Way Media — send this brief:",
      ...BRIEF_CHECKLIST.map((x, i) => `${i + 1}. ${x}`),
      "",
      "Form: /start-project · IG: @zacks_way_media",
      "Signal over noise.",
    ].join("\n");
    void navigator.clipboard.writeText(text);
    toast.success("Checklist copied", {
      description: "Paste into an IG reply or text.",
    });
  }

  if (!hydrated) {
    return (
      <div className="theme-dark flex min-h-dvh items-center justify-center p-6">
        <div className="h-10 w-48 animate-pulse bg-surface-2" />
      </div>
    );
  }

  return (
    <div className="theme-dark min-h-dvh text-fg">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/92 backdrop-blur-sm supports-[backdrop-filter]:bg-bg/80">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center bg-primary font-display text-sm font-bold tracking-tight text-primary-fg">
              ZW
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate font-display text-sm font-semibold tracking-tight">
                Zack's Way Media
              </p>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-subtle">
                Signal over noise
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-5 text-sm text-muted lg:flex">
            <a href="#work" className="transition-colors hover:text-fg">
              Work
            </a>
            <a href="#proof" className="transition-colors hover:text-fg">
              Proof
            </a>
            <a href="#packages" className="transition-colors hover:text-fg">
              Packages
            </a>
            <a href="#services" className="transition-colors hover:text-fg">
              Services
            </a>
            <Link to="/start-project" className="transition-colors hover:text-fg">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeSwitcher compact />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setEditOpen(true)}
              aria-label="Edit"
            >
              <Settings2 />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => setEditOpen(true)}
            >
              <Pencil className="size-3.5" />
              Edit
            </Button>
            <Button size="sm" asChild>
              <Link to="/start-project">
                Start a project
                <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <StatementStage>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-9 sm:px-6 sm:py-12 lg:py-14">
          <div className="enter-rise flex flex-col items-center gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <StatementMark className="w-full max-w-2xl" />
            <div className="enter-rise stagger-2 w-full max-w-sm space-y-3.5 text-center lg:text-right">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-subtle">
                Not another semi-site
              </p>
              <p className="text-sm leading-relaxed text-muted lg:text-[0.9375rem]">
                Hill City production with a chrome front door — Instagram-proof
                work, clear packages, and a real intake for clients.
              </p>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-center lg:justify-end">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link to="/start-project">
                    Start a project
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                  <a href="#work">See work</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </StatementStage>

      {/* Identity + hero reel */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_80%_20%,rgb(225_6_0/0.12),transparent_42%)]" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12">
          <div className="enter-rise space-y-7">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="default" className="gap-1.5">
                <Sparkles className="size-3" />
                Available for clients
              </Badge>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-subtle">
                <MapPin className="size-3 text-primary" />
                Lynchburg, VA · travel OK
              </span>
            </div>

            <div className="space-y-3">
              <p className="section-label">Creative production · Social-first</p>
              <h2 className="headline text-[clamp(1.85rem,4vw,2.75rem)]">
                Corporate clarity.
                <br />
                <span className="text-primary">Street-level edge.</span>
              </h2>
              <p className="lede max-w-lg text-sm sm:text-base">
                {profile.bio} We help teams look sharper on camera and on the feed —
                polish clients trust, energy the feed remembers.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" asChild>
                <Link to="/start-project">
                  Open client intake
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" onClick={openInstagram}>
                <Instagram className="size-4" />
                @zacks_way_media
                <ExternalLink className="size-4" />
              </Button>
            </div>

            <dl className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
              {PROOF_META.map((item) => (
                <div key={item.label} className="bg-surface px-3 py-3.5 sm:px-4">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-subtle">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-sm font-semibold tracking-tight text-fg sm:text-base">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="enter-rise stagger-2 space-y-3">
            <HeroReel />
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
              Live from the feed · mute by default
            </p>
          </div>
        </div>
      </section>

      {/* Shot in / region */}
      <div className="overflow-hidden border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-primary">
            Hill City production
          </p>
          <div className="flex flex-wrap gap-2">
            {SHOT_IN.map((place) => (
              <span
                key={place}
                className="border border-border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted"
              >
                {place}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ReelsCarousel />

      {/* Proof / case studies */}
      <section id="proof" className="perf-section scroll-mt-20 border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-10 max-w-xl">
            <p className="section-label mb-3">Proof</p>
            <h2 className="headline text-[clamp(1.85rem,4.5vw,3.1rem)]">
              Recent energy,
              <span className="text-primary"> not theory.</span>
            </h2>
            <p className="lede mt-4 text-sm">
              Short case notes tied to real frames from the feed — so clients see
              how the work lands.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {CASE_STUDIES.map((c) => (
              <article
                key={c.title}
                className="group flex flex-col overflow-hidden border border-border bg-surface transition-[border-color,box-shadow] duration-[var(--motion-fast)] hover:border-primary/45 hover:shadow-red"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-surface-2">
                  <img
                    src={c.thumb}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute left-3 top-3 border border-primary/50 bg-black/55 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-primary">
                    {c.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-fg/90">{c.result}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the camera */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label mb-2">Behind the camera</p>
              <h2 className="headline text-[clamp(1.75rem,4vw,2.75rem)]">
                Frames from the set.
              </h2>
            </div>
            <p className="max-w-xs text-sm text-muted sm:text-right">
              Grit, chrome, night — the same language as the site.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {BEHIND.map((b) => (
              <figure
                key={b.src}
                className="group relative aspect-[3/4] overflow-hidden border border-border bg-surface-2"
              >
                <img
                  src={b.src}
                  alt={b.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg">
                  {b.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="perf-section scroll-mt-20 border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-10 max-w-xl">
            <p className="section-label mb-3">Packages</p>
            <h2 className="headline text-[clamp(1.85rem,4.5vw,3.1rem)]">
              Clear scopes.
              <span className="text-primary"> Honest bands.</span>
            </h2>
            <p className="lede mt-4 text-sm">
              Starting points — not a hard quote. Finals depend on day count,
              deliverables, and travel.
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.name}
                className={cn(
                  "flex flex-col border border-border bg-surface p-6 sm:p-7",
                  pkg.featured && "red-rim-strong relative lg:-translate-y-1",
                )}
              >
                {pkg.featured ? (
                  <span className="mb-3 w-fit border border-primary/50 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-primary">
                    Most booked
                  </span>
                ) : null}
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {pkg.name}
                </h3>
                <p className="mt-2 font-mono text-sm text-primary">{pkg.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{pkg.blurb}</p>
                <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm text-fg/90">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full" variant={pkg.featured ? "default" : "outline"} asChild>
                  <Link to="/start-project">
                    Inquire
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* House brand 6D6 */}
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 py-14 sm:grid-cols-2 sm:px-6 sm:py-16">
          <div className="hatch red-rim flex flex-col justify-between p-7 sm:p-9">
            <div>
              <p className="section-label mb-3">House brand</p>
              <h2 className="headline text-[clamp(1.85rem,4vw,2.85rem)]">
                6 Dirty Six
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                Merch and media under one system. The red-rim language on this site
                is the same attitude as the drop — scene first, clean execution.
              </p>
            </div>
            <Button className="mt-8 w-full sm:w-auto" variant="outline" asChild>
              <a href="https://6dirty6.com" target="_blank" rel="noopener noreferrer">
                Shop 6dirty6.com
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
          <div className="border border-border bg-surface p-7 sm:p-9">
            <p className="section-label mb-3">Worked with / around</p>
            <h2 className="headline text-[clamp(1.75rem,3.5vw,2.5rem)]">
              Scene, not stock logos.
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {WORKED_WITH.map((w) => (
                <span
                  key={w}
                  className="border border-border px-3 py-2 font-display text-sm font-semibold tracking-tight text-muted transition-colors hover:border-primary/50 hover:text-fg"
                >
                  {w}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-subtle">
              Real tags and collabs live on{" "}
              <button type="button" className="text-primary hover:underline" onClick={openInstagram}>
                @zacks_way_media
              </button>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="perf-section scroll-mt-20 border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="section-label mb-3">Capabilities</p>
              <h2 className="headline text-[clamp(2rem,4.5vw,3.25rem)]">
                What clients
                <span className="text-primary"> hire us </span>
                for.
              </h2>
            </div>
            <p className="lede max-w-sm text-sm sm:text-right">
              Clear scopes. Modern execution. Edgy enough to stand out — polished
              enough for the boardroom.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <article
                  key={cap.index}
                  className="group relative overflow-hidden border border-border bg-surface p-6 transition-[border-color,box-shadow,transform] duration-[var(--motion-fast)] hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-red sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs tabular-nums text-primary">
                      {cap.index}
                    </span>
                    <Icon className="size-5 text-muted transition-colors group-hover:text-primary" />
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-bold tracking-tight sm:text-[1.75rem]">
                    {cap.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                    {cap.blurb}
                  </p>
                  <div className="mt-6 h-px w-12 bg-border transition-all duration-[var(--motion-fast)] group-hover:w-20 group-hover:bg-primary" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="perf-section scroll-mt-20 border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-10 max-w-xl">
            <p className="section-label mb-3">How we work</p>
            <h2 className="headline text-[clamp(2rem,4.5vw,3.25rem)]">
              A process clients
              <span className="text-primary"> can trust.</span>
            </h2>
          </div>
          <ol className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <li key={p.step} className="bg-surface p-5 sm:p-6">
                <span className="font-mono text-xs tabular-nums text-primary">{p.step}</span>
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Brief checklist + studio card */}
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 py-14 sm:grid-cols-2 sm:px-6 sm:py-20">
          <div className="border border-border bg-surface p-7 sm:p-9">
            <p className="section-label mb-4">What to send Zack</p>
            <h2 className="headline text-[clamp(1.75rem,3.5vw,2.5rem)]">
              Brief checklist
            </h2>
            <ul className="mt-6 space-y-3">
              {BRIEF_CHECKLIST.map((item, i) => (
                <li key={item} className="flex gap-3 text-sm text-muted">
                  <span className="font-mono text-[0.65rem] tabular-nums text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-fg/90">{item}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8" variant="outline" onClick={copyBriefChecklist}>
              Copy checklist
            </Button>
          </div>
          <div className="red-rim hatch flex flex-col justify-between p-7 sm:p-9">
            <div>
              <p className="section-label mb-4">Studio</p>
              <h2 className="headline text-[clamp(1.75rem,3.5vw,2.5rem)]">
                {name}
              </h2>
              <button
                type="button"
                onClick={copyHandle}
                className="mt-3 border border-primary/40 px-2.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted hover:border-primary hover:text-fg"
              >
                @{profile.handle || "zacks_way_media"}
              </button>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Signal over noise. Use the form for serious work — DM for a quick
                hello.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/start-project">
                  Start a project
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/leads">Leads inbox</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="perf-section scroll-mt-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label mb-3">Contact</p>
            <h2 className="headline text-[clamp(2.25rem,5vw,3.75rem)]">
              Let's make the
              <br />
              next thing{" "}
              <span className="text-primary">impossible</span>
              <br />
              to ignore.
            </h2>
            <p className="lede mt-5 max-w-md text-sm">
              Name, phone, socials, budget, goals — the intake is built so Zack can
              reply with a clear next step.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/start-project">
                Start a project
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={openInstagram}>
              <Instagram className="size-4" />
              Instagram
              <ExternalLink className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center bg-primary font-display text-xs font-bold text-primary-fg">
              ZW
            </div>
            <div>
              <p className="font-display text-sm font-semibold tracking-tight">
                Zack's Way Media
              </p>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-subtle">
                Lynchburg · Signal over noise
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
            <Link to="/start-project" className="hover:text-primary">
              Start a project
            </Link>
            <Link to="/leads" className="hover:text-primary">
              Leads
            </Link>
            <a
              href="https://6dirty6.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              6D6
            </a>
            <button type="button" className="hover:text-primary" onClick={openInstagram}>
              Instagram
            </button>
            <span className="text-border-strong">© 2026</span>
          </div>
        </div>
      </footer>

      <SetupDialog open={editOpen} onOpenChange={setEditOpen} mode="edit" />
    </div>
  );
}
