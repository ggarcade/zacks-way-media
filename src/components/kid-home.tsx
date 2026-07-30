import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
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
import { StatementMark, StatementStage } from "@/components/statement-mark";
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

const PROOF = [
  { label: "Based in", value: "Lynchburg, VA" },
  { label: "Channel", value: "@zacks_way_media" },
  { label: "Focus", value: "Clients & creators" },
  { label: "Tone", value: "Corporate · edgy" },
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

  if (!hydrated) {
    return (
      <div className="theme-dark flex min-h-dvh items-center justify-center p-6">
        <div className="h-10 w-48 animate-pulse bg-surface-2" />
      </div>
    );
  }

  return (
    <div className="theme-dark min-h-dvh text-fg">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/85 backdrop-blur-md">
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
                Creative studio
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <a href="#work" className="transition-colors hover:text-fg">
              Work
            </a>
            <a href="#services" className="transition-colors hover:text-fg">
              Services
            </a>
            <a href="#process" className="transition-colors hover:text-fg">
              Process
            </a>
            <Link to="/start-project" className="transition-colors hover:text-fg">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
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
                A harder front door for Lynchburg media — chrome statement,
                warning red, and a real path from Instagram to client work.
              </p>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-center lg:justify-end">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link to="/start-project">
                    Start a project
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                  <a href="#work">See top reels</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </StatementStage>

      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_80%_20%,rgb(225_6_0/0.12),transparent_42%)]" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-12">
          <div className="enter-rise space-y-7">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="default" className="gap-1.5">
                <Sparkles className="size-3" />
                Available for clients
              </Badge>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-subtle">
                <MapPin className="size-3 text-primary" />
                Lynchburg, Virginia
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
              {PROOF.map((item) => (
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

          <div className="enter-rise stagger-2 relative">
            <div className="absolute -left-3 top-8 hidden h-[calc(100%-4rem)] items-center lg:flex">
              <span className="vert-label">Signature lockup live</span>
            </div>
            <div className="red-rim-strong hatch relative min-h-[22rem] overflow-hidden p-6 sm:min-h-[24rem] sm:p-8">
              <div className="relative z-10 flex h-full min-h-[20rem] flex-col justify-between sm:min-h-[22rem]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
                      Studio card
                    </p>
                    <p className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {name}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={copyHandle}
                    className="border border-primary/40 bg-bg/50 px-2.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-primary hover:text-fg"
                  >
                    @{profile.handle || "zacks_way_media"}
                  </button>
                </div>

                <div className="space-y-3">
                  <StatementMark compact />
                  <p className="max-w-xs text-sm text-muted">
                    That line is the brand. Everything below proves it — reels,
                    process, and a real client intake.
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-primary/30 pt-4">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                    Client intake live
                  </span>
                  <Button size="sm" variant="soft" asChild>
                    <Link to="/start-project">
                      Inquire
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3.5 sm:px-6">
          {["Strategy", "Direction", "Capture", "Edit", "Ship"].map((item, i) => (
            <span key={item} className="inline-flex items-center gap-6">
              <span
                className={cn(
                  "font-display text-sm font-semibold tracking-tight",
                  i % 2 === 0 ? "text-fg" : "text-muted",
                )}
              >
                {item}
              </span>
              {i < 4 ? <span className="hidden text-primary sm:inline">·</span> : null}
            </span>
          ))}
        </div>
      </div>

      <ReelsCarousel />

      <section id="services" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
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

      <section id="process" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
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

      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 py-16 sm:grid-cols-2 sm:px-6 sm:py-20">
          <div className="border border-border bg-surface p-7 sm:p-9">
            <p className="section-label mb-4">Positioning</p>
            <h2 className="headline text-[clamp(1.75rem,3.5vw,2.75rem)]">
              Why this doesn't
              <br />
              look like everyone else.
            </h2>
            <p className="lede mt-5 text-sm">
              Most studio sites blend into a sea of safe layouts. The chrome
              lockup, red-rim system, and Instagram-proof reels make this a brand
              you remember before you scroll — then the intake form makes it useful.
            </p>
          </div>
          <div className="red-rim hatch flex flex-col justify-between p-7 sm:p-9">
            <div>
              <p className="section-label mb-4">Engagement</p>
              <h2 className="headline text-[clamp(1.75rem,3.5vw,2.75rem)]">
                Ready when
                <br />
                you are.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Use the intake form for a full brief, or DM for a quick hello.
                Serious projects start with the form.
              </p>
            </div>
            <Button className="mt-8 w-full sm:w-auto" size="lg" asChild>
              <Link to="/start-project">
                Open client intake
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20">
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
              The calling-card form collects name, phone, socials, budget, and goals —
              everything Zack needs before a kickoff.
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
