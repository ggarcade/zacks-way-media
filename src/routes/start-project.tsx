import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock3,
  Instagram,
  MapPin,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectIntakeForm } from "@/components/project-intake-form";
import { ThemeSwitcher } from "@/components/theme-switcher";

export const Route = createFileRoute("/start-project")({
  component: StartProjectPage,
  head: () => ({
    meta: [
      { title: "Start a project · Zack's Way Media" },
      {
        name: "description",
        content:
          "Client intake for Zack's Way Media — share your name, socials, budget, and goals to start a project.",
      },
    ],
  }),
});

const STEPS = [
  {
    n: "01",
    title: "Send the brief",
    body: "Name, contact, socials, and what success looks like.",
  },
  {
    n: "02",
    title: "We review fit",
    body: "Timeline, budget, and creative scope checked against capacity.",
  },
  {
    n: "03",
    title: "Kickoff call / DM",
    body: "If it’s a match, we lock direction and dates.",
  },
];

const NEED_LIST = [
  "Primary contact + best channel",
  "Brand or personal handle(s)",
  "Project type and desired deliverables",
  "Rough budget band (even if TBD)",
  "When you need it live",
  "Location or remote constraints",
  "Reference looks / competitors / past work",
];

function StartProjectPage() {
  return (
    <div className="theme-dark min-h-dvh text-fg">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/92 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex size-9 shrink-0 items-center justify-center bg-primary font-display text-sm font-bold tracking-tight text-primary-fg">
              ZW
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate font-display text-sm font-semibold tracking-tight">
                Zack's Way Media
              </p>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-subtle">
                Start a project
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeSwitcher compact />
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/">
                <ArrowLeft className="size-3.5" />
                Home
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/zacks_way_media/",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              <Instagram className="size-3.5" />
              Instagram
            </Button>
          </div>
        </div>
      </header>

      {/* Hero band */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_15%_0%,rgb(225_6_0/0.2),transparent_45%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="enter-rise space-y-6">
            <p className="section-label">Calling card · Client intake</p>
            <h1 className="headline text-[clamp(2.5rem,6vw,4.5rem)]">
              Start a project
              <span className="text-primary">.</span>
              <br />
              <span className="type-outline">Leave the brief.</span>
            </h1>
            <p className="lede max-w-lg text-sm sm:text-base">
              This page is how clients book Zack's Way Media. Fill it once —
              name, phone, handles, goals — and we'll reply with a clear next
              step. Built for founders, local brands, and teams who want edge with
              polish.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5 border border-border bg-surface px-3 py-2">
                <MapPin className="size-3.5 text-primary" />
                Lynchburg, VA · travel OK
              </span>
              <span className="inline-flex items-center gap-1.5 border border-border bg-surface px-3 py-2">
                <Clock3 className="size-3.5 text-primary" />
                Typical reply: 24–48 hrs
              </span>
              <span className="inline-flex items-center gap-1.5 border border-border bg-surface px-3 py-2">
                <ShieldCheck className="size-3.5 text-primary" />
                No spam · project only
              </span>
            </div>
          </div>

          <div className="enter-rise stagger-2 red-rim hatch p-6 sm:p-7">
            <p className="section-label mb-3">What we need from you</p>
            <ul className="space-y-2.5">
              {NEED_LIST.map((item, i) => (
                <li key={item} className="flex gap-3 text-sm text-muted">
                  <span className="font-mono text-[0.65rem] tabular-nums text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-fg/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-px overflow-hidden border-b border-border bg-border sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-surface px-5 py-6 sm:px-6">
              <span className="font-mono text-xs tabular-nums text-primary">{s.n}</span>
              <h2 className="mt-3 font-display text-xl font-bold tracking-tight">
                {s.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.75fr)] lg:items-start">
          <ProjectIntakeForm />

          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="border border-border bg-surface p-6">
              <p className="section-label mb-3">Studio</p>
              <h3 className="font-display text-2xl font-bold tracking-tight">
                Zack's Way Media
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Lynchburg-based creative production — brand films, social systems,
                merch drops, and campaign visuals. Instagram-first, client-ready.
              </p>
              <Button
                className="mt-5 w-full"
                variant="outline"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/zacks_way_media/",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                <Instagram className="size-4" />
                @zacks_way_media
                <ArrowUpRight className="size-4" />
              </Button>
            </div>

            <div className="border border-border bg-surface p-6">
              <div className="mb-3 flex size-10 items-center justify-center border border-primary/30 bg-primary-soft text-primary">
                <MessageSquare className="size-5" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight">
                Prefer a quick DM?
              </h3>
              <p className="mt-2 text-sm text-muted">
                Still use this form when you can — it gives Zack the details he
                needs. For a fast hello, Instagram works too.
              </p>
            </div>

            <div className="red-rim p-6">
              <p className="section-label mb-2">Tip for a strong brief</p>
              <p className="text-sm leading-relaxed text-muted">
                Link 2–3 references, name the platform (Reels, YouTube, event
                screen), and say what “done” looks like. Budget honesty speeds
                everything up.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
            Zack's Way Media · Client intake
          </p>
          <Link
            to="/"
            className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted hover:text-primary"
          >
            ← Back to homepage
          </Link>
        </div>
      </footer>
    </div>
  );
}
