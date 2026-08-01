# Letter to Future Grok — Zack's Way Media Website

**Written:** Thursday, July 30, 2026 (session with dad / G&G Arcade, Lynchburg, VA)  
**Purpose:** Full decision log so any future conversation can change this site without rediscovering context.  
**How to use:** Read this file first. Prefer editing in place over re-scaffolding. Production is live.

---

## 1. Who this is for

| Role | Person / handle | Notes |
|------|-----------------|--------|
| **Owner / talent** | Zack (son) | Instagram: **@zacks_way_media** |
| **Sponsor / client of this build** | Dad (G&G Arcade / SuperGrok Pro) | Lynchburg, VA IP; building a calling-card site for Zack to send clients |
| **Studio brand** | **Zack's Way Media** | Client-facing creative / media studio, not a personal "link in bio" toy |

**Positioning (locked unless Zack overrides):**  
Edgy-but-professional media studio. Corporate enough for clients, more streetwear/motorsports energy than SaaS bland. Tagline / signature:

> **SIGNAL OVER NOISE**  
> *Built for brands that move.*

Dad may later change **red → purple** (or other accent) after Zack reviews. Theme tokens make that a one-pass CSS change.

---

## 2. Live URLs (as of end of session)

| What | URL |
|------|-----|
| **Production (Vercel) — send this to Zack** | https://zacks-way-media.vercel.app |
| Start a project (client intake) | https://zacks-way-media.vercel.app/start-project |
| Leads inbox (password-gated) | https://zacks-way-media.vercel.app/leads |
| GitHub source | https://github.com/ggarcade/zacks-way-media |
| Instagram | https://www.instagram.com/zacks_way_media |
| Vercel project | `zacks-way-media` · team `team_jihJ8FIPCWKG6ge02SSyh5xP` · project id `prj_QFqFGTjYkpv3LkjL6MOEKMVzkygT` |
| Vercel production domain alias | `zacks-way-media.vercel.app` |

**Leads page access code:** `signal2026`  
(stored client-side in sessionStorage after entry; change in `src/routes/leads.tsx` if needed.)

**Vercel protection:** SSO / Vercel Authentication was **disabled** so the public can open the site without logging into Vercel. Do not re-enable for client demos.

**Temporary share tunnels (Cloudflare trycloudflare):** used mid-session only. Prefer the Vercel URL going forward.

---

## 3. What we built (product surface)

### Routes

| Path | Purpose |
|------|---------|
| `/` | Full marketing home — hero, statement, hero reel, reels carousel, proof, packages, services, process, contact CTAs |
| `/start-project` | Client intake form (calling card) — legit-looking multi-field form, process sidebar, success state |
| `/leads` | Simple password-gated list of submitted inquiries for Zack/dad to review |

### Homepage structure (top → bottom)

1. Sticky header (logo mark **ZW**, nav anchors, Instagram, **Start a project**)
2. **Statement stage** — chrome metallic lockup: *Signal over / Noise* + *Built for brands that move*
3. Hero grid — studio blurb (Lynchburg), CTAs, **hero reel** (autoplay muted video from real IG, poster first)
4. Stats strip
5. **Reels carousel** — top viewed IG reels (local thumbnails), horizontal scroll
6. Proof / work highlights
7. Packages
8. Services
9. Process
10. Contact / CTA
11. Footer

### Client intake fields (`/start-project`)

Required / collected:

- Full name*, email*, phone  
- Company  
- Instagram handle, other socials, website  
- Project type*, budget range, timeline, location  
- Preferred contact method  
- Goals / brief*  
- Referral  

\* = required (Zod + server fn).  
Stored in `project_inquiries` table (PGLite locally; Neon when `DATABASE_URL` set on Vercel).

---

## 4. Visual / brand decisions

### Theme: **red-rimmed dark** (current)

Inspired by dad’s reference:

1. **Six Dirty Six** store screenshot — black/red streetwear, hatch textures, red-rim cards, condensed display type  
2. **Venom Motorsports** logo snag — metallic/chrome wordmark energy, adapted to **red/black only** (no purple chrome on production)

| Token | Value | Role |
|-------|--------|------|
| Background | `#060606` / near-black | Base |
| Surfaces | `#0e0e0e` … `#1a1a1a` | Cards / inputs |
| Primary / rim | `#e10600` | Accents, rims, CTAs, chrome mid-tones |
| Foreground | `#f2f2f0` | Body text |
| Muted / subtle | gray scale | Labels |

CSS lives in `src/styles.css` (`@theme` + utilities: `.red-rim`, `.chrome-mark`, `.statement-stage`, etc.).

### Typography

| Role | Family |
|------|--------|
| Display / chrome | **Syne** (800) |
| Body | **Plus Jakarta Sans** |
| Mono labels | **IBM Plex Mono** |

Loaded via Google Fonts in root layout. Direction: modern, innovative placement (vertical side labels, outline type, watermark, staggered enters) — not generic centered SaaS hero.

### Chrome statement (“Signal over noise”)

- Class: `.chrome-mark` / `.chrome-mark-sm` in `src/styles.css`  
- Component: `src/components/statement-mark.tsx`  
- **Size:** reduced ~30% after dad feedback (`clamp(1.55rem, 9.5vw, 4.7rem)` range)  
- **Intensity:** “lower the machine” — fewer drop-shadows (one soft red glow), no infinite spin/sweep animations, static lean (no scroll-linked re-renders)  
- Visual goal: motorsports chrome, red metal gradient, black letter definition — differentiates from template sites  

### Explicitly deferred / open to Zack

- Accent color may flip to **purple** or other after his review  
- Copy refinements, package pricing, service list  
- Real booking calendar / email notifications  
- Custom domain  

---

## 5. Content & Instagram

- Handle: **@zacks_way_media**  
- Location copy: **Lynchburg, Virginia**  
- Reels: scraped mid-session; top viewed videos used for carousel + one hero reel  
- Local assets (avoid IG CDN expiry / CORS):

  - `public/ig/reel-1.jpg` … `reel-6.jpg`  
  - `public/ig/hero-poster.jpg`  
  - `public/ig/hero-reel.mp4` (compressed ~0.5–1.2MB class web encode)  
  - Data: `src/data/instagram-reels.json`, `src/data/hero-reel.json`  

Hero reel component: `src/components/hero-reel.tsx`  
- Poster first, `preload="none"`  
- Plays only when in viewport (IntersectionObserver)  
- Muted by default; unmute control  

Carousel: `src/components/reels-carousel.tsx` — rank badges, view counts, links out to IG.

---

## 6. Technical stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + **TanStack Start** / Router / Query |
| Build | Vite 8, `vite.config.ts` self-contained (no vendored preset import) |
| Styling | Tailwind v4, custom `@theme` tokens |
| UI | Radix + shadcn-style local components under `src/components/ui/` |
| Forms | react-hook-form + Zod |
| State | zustand (profile / local bits) |
| DB | PGLite (dev) + Neon/Postgres via `DATABASE_URL` (prod); Kysely |
| Auth scaffolding | better-auth present (template); public marketing site mostly unauthenticated |
| Deploy target | **Vercel** via Nitro preset `vercel` (gated to `command === "build"`) |
| Preview contract (sandbox) | `0.0.0.0:8080`, `startup.sh` |

### Important config rules

- `nitro({ preset: "vercel" })` **only in build**, never in dev (avoids second port / broken preview).  
- Server: `host: "0.0.0.0", port: 8080, strictPort: true`.  
- Migrations: `migrations/0001_auth.sql`, `migrations/0002_project_inquiries.sql` — run via `npm run db:migrate` as part of `npm run build`.  

### Main source map

```
src/
  components/
    kid-home.tsx          # homepage composition
    statement-mark.tsx    # chrome lockup
    hero-reel.tsx
    reels-carousel.tsx
    project-intake-form.tsx
    setup-dialog.tsx
    ui/*
  routes/
    index.tsx             # → KidHome
    start-project.tsx
    leads.tsx
    __root.tsx
  lib/
    inquiries.ts          # createServerFn + Zod + DB
    db.ts
    profile-store.ts
  data/
    instagram-reels.json
    hero-reel.json
  styles.css              # tokens + chrome + rims
public/ig/                # media assets
migrations/
```

---

## 7. Performance decisions (lag pass)

Dad reported lag; we smoothed:

1. **Hero video** heavily compressed (scale/fps/CRF); only loads when near viewport  
2. **Chrome text** — removed multi-stack drop-shadows (huge paint cost); one soft glow  
3. **Removed scroll-linked statement animation** (was re-rendering every frame)  
4. **Killed continuous** statement-spin / chrome-sweep / lean-idle animations  
5. Lighter sticky header blur (`backdrop-blur-sm`)  
6. Reels: less hover transform thrash, less blur  
7. `content-visibility: auto` on long sections (`.perf-section`)  
8. Compressed reel JPGs  

If lag returns: check video size, filters on `.chrome-mark`, and any new scroll listeners first.

---

## 8. Deploy notes (how prod got live)

- Repo: **github.com/ggarcade/zacks-way-media** (owner path used in session: `ggarcade`)  
- Vercel project created under dad’s connected account (username slug `gregferguson-3998`)  
- Full source deploy used a **bootstrap** build that pulls GitHub `main` tarball, `npm install`, `npm run build`, copies `.vercel/output` — so **pushing to `main` does not auto-deploy** unless Git is linked in Vercel UI or bootstrap redeploy is run again  
- **To ship changes to production after edits:**

  1. Commit + push to GitHub `main`  
  2. Redeploy via Vercel (import/connect Git **or** re-run deploy tool / bootstrap)  
  3. Confirm https://zacks-way-media.vercel.app  

- Optional: in Vercel dashboard, **Import** the GitHub repo for continuous deploy on push (recommended for easy future edits).  

---

## 9. What dad asked for (chronology)

1. Build a site for his kid (IG, Lynchburg) — efficient, demo-quality  
2. Handle: `instagram.com/zacks_way_media`  
3. Dark **red-rimmed** theme (Six Dirty Six reference)  
4. Modern typography; client-facing but edgy; innovative type placement  
5. IG scrape → **carousel of top viewed reels** mid-page  
6. **Start a project** intake page (name, phone, handles, project info) — legit enough to send as calling card  
7. **“Signal over noise / brands that move”** chrome statement (Venom Motorsports ref, red scheme)  
8. Lower intensity + **~30% smaller** statement type for balance  
9. **Performance** pass (laggy spots)  
10. Hosting question → temporary Cloudflare tunnel mid-session → **Vercel production** after account connect  
11. This decision log  

Open for Zack’s opinion; expect nitpicks and possible purple accent.

---

## 10. How to change common things (cheat sheet)

| Want | Where / how |
|------|-------------|
| Primary color (red → purple) | `src/styles.css` `@theme` `--color-primary`, `--color-rim`, soft/accent variants; re-check chrome gradient reds |
| Tagline / chrome words | `src/components/statement-mark.tsx` |
| Hero / packages / services copy | `src/components/kid-home.tsx` |
| Reels list / order | `src/data/instagram-reels.json` + `public/ig/*` thumbs |
| Hero video | `public/ig/hero-reel.mp4`, poster, `src/data/hero-reel.json` |
| Intake fields | `src/components/project-intake-form.tsx` + Zod in `src/lib/inquiries.ts` + migration if columns change |
| Leads password | `src/routes/leads.tsx` |
| Fonts | Google Fonts link in `__root.tsx` + `--font-*` in `styles.css` |
| SEO title/description | `__root.tsx` / route head meta |

### After any real change

1. `npm run typecheck`  
2. `npm run build` (must pass for Vercel)  
3. Verify UI in browser (dev + preferably prod)  
4. Push GitHub + redeploy Vercel  

---

## 11. Explicit non-goals (for now)

- Multiplayer / social network  
- Real payment checkout  
- Live Instagram API continuous sync (static scraped snapshot + local media is fine)  
- Email/SMS notify on new lead (nice later)  
- Custom domain (add in Vercel when ready)  
- Full CMS  

---

## 12. Voice & quality bar

- Speak product language to the human (“your site is live”) — not ports/containers  
- Demo-quality scrollable calling card, not wireframes  
- Mobile ~390px usable  
- Red rims, chrome statement, reels, intake form = core differentiators  
- Don’t gold-plate; dad said remaining feedback will be nitpicky + Zack’s taste  

---

## 13. One-paragraph summary for a cold start

Zack’s Way Media is a dark, red-rimmed, edgy-corporate studio site for @zacks_way_media (Lynchburg). Signature line is metallic **SIGNAL OVER NOISE / Built for brands that move** (size/intensity dialed down ~30%). Home shows hero reel + top IG reels carousel, packages/services, and CTAs into `/start-project` (full client intake → DB). `/leads` is gated with code `signal2026`. Stack is TanStack Start + Tailwind v4 + Vercel. Production: **https://zacks-way-media.vercel.app**. Code: **github.com/ggarcade/zacks-way-media**. Theme tokens allow a fast purple pivot if Zack wants it. Performance was optimized (video, chrome paint, no scroll thrash). Prefer iterative edits + redeploy over rebuild-from-scratch.

---

*End of letter. Update this file when major product decisions change.*


## 14. Theme switcher (added Aug 1, 2026)

Client-facing **palette switcher** in the header (home + start-project):

| Id | Label | Accent |
|----|-------|--------|
| `red` | Crimson | `#e10600` (default studio) |
| `green` | Signal | `#12b76a` |
| `blue` | Electric | `#3b82f6` |

- Black base stays fixed; only rim / chrome / primary recolor.
- Stored in `localStorage` key `zwm-accent` (zustand persist).
- FOUC boot script in `__root.tsx` applies `data-accent` before paint.
- CSS tokens: `html[data-accent="…"]` overrides `--color-primary`, `--accent-rgb`, `--chrome-*`.
- Components: `src/components/theme-switcher.tsx`, `src/lib/theme-store.ts`.

