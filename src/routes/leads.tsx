import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Inbox, Loader2, Lock, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BUDGET_RANGES,
  CONTACT_METHODS,
  type InquiryRow,
  PROJECT_TYPES,
  TIMELINES,
  labelFor,
  listProjectInquiries,
} from "@/lib/inquiries";

export const Route = createFileRoute("/leads")({
  component: LeadsPage,
  head: () => ({
    meta: [
      { title: "Leads · Zack's Way Media" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function LeadsPage() {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<InquiryRow[]>([]);

  async function load(accessCode: string) {
    setLoading(true);
    try {
      const res = await listProjectInquiries({ data: { code: accessCode } });
      if (!res.ok) {
        toast.error(res.error);
        setUnlocked(false);
        setRows([]);
        return;
      }
      setRows(res.rows);
      setUnlocked(true);
      toast.success(`${res.rows.length} lead${res.rows.length === 1 ? "" : "s"} loaded`);
    } catch (e) {
      console.error(e);
      toast.error("Could not load leads");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="theme-dark min-h-dvh text-fg">
      <header className="border-b border-border/70 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft className="size-4" />
            Site
          </Link>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-subtle">
            Private · Leads
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {!unlocked ? (
          <div className="mx-auto max-w-md space-y-6 border border-border bg-surface p-6 sm:p-8">
            <div className="flex size-11 items-center justify-center border border-primary/40 bg-primary-soft text-primary">
              <Lock className="size-5" />
            </div>
            <div>
              <p className="section-label mb-2">Zack only</p>
              <h1 className="headline text-3xl">Leads inbox</h1>
              <p className="mt-2 text-sm text-muted">
                Enter the access code to see project inquiries from the intake form.
              </p>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                void load(code);
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="code" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                  Access code
                </Label>
                <Input
                  id="code"
                  type="password"
                  autoComplete="current-password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading || !code.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Checking…
                  </>
                ) : (
                  <>
                    <Inbox className="size-4" />
                    Open inbox
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-subtle">
              Default code for this build:{" "}
              <span className="font-mono text-muted">signal2026</span>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label mb-2">Inbox</p>
                <h1 className="headline text-3xl sm:text-4xl">
                  {rows.length} lead{rows.length === 1 ? "" : "s"}
                </h1>
              </div>
              <Button variant="outline" size="sm" disabled={loading} onClick={() => void load(code)}>
                <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {rows.length === 0 ? (
              <div className="border border-border bg-surface p-8 text-sm text-muted">
                No inquiries yet. When someone submits{" "}
                <Link to="/start-project" className="text-primary hover:underline">
                  Start a project
                </Link>
                , they show up here.
              </div>
            ) : (
              <ul className="space-y-3">
                {rows.map((row) => (
                  <li key={row.id} className="border border-border bg-surface p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-xl font-bold tracking-tight">
                          {row.full_name}
                        </p>
                        <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-subtle">
                          #{row.id} · {new Date(row.created_at).toLocaleString()}
                        </p>
                      </div>
                      <span className="border border-primary/40 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-primary">
                        {labelFor(PROJECT_TYPES, row.project_type)}
                      </span>
                    </div>
                    <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-subtle">Email</dt>
                        <dd>
                          <a className="text-fg hover:text-primary" href={`mailto:${row.email}`}>
                            {row.email}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-subtle">Phone</dt>
                        <dd>{row.phone || "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-subtle">Company</dt>
                        <dd>{row.company || "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-subtle">Instagram</dt>
                        <dd>{row.instagram ? `@${row.instagram.replace(/^@/, "")}` : "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-subtle">Budget</dt>
                        <dd>{labelFor(BUDGET_RANGES, row.budget_range)}</dd>
                      </div>
                      <div>
                        <dt className="text-subtle">Timeline</dt>
                        <dd>{labelFor(TIMELINES, row.timeline)}</dd>
                      </div>
                      <div>
                        <dt className="text-subtle">Contact via</dt>
                        <dd>{labelFor(CONTACT_METHODS, row.preferred_contact)}</dd>
                      </div>
                      <div>
                        <dt className="text-subtle">Location</dt>
                        <dd>{row.location || "—"}</dd>
                      </div>
                    </dl>
                    <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted">
                      {row.goals}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
