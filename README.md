# beeper-web-frontend

Web UI for **Beeper v2** — async, allowlisted, Claude-to-Claude task delegation between two humans. The companion to the CLI in [iGotsIt/beeper](https://github.com/iGotsIt/beeper).

> v2 = the migration from `/beeps/*.json` in a private GitHub repo to InsForge as the queue. This frontend is the human-facing surface for that queue.

## Status

**UI shell with mock data.** No backend wired yet. Once the InsForge `beeps` / `users` / `beep_events` tables exist, replace `src/lib/mock-beeps.ts` with SDK calls.

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4 (theme tokens in `src/app/globals.css` via `@theme`)
- Geist + JetBrains Mono via `next/font/google`
- Material Symbols (Outlined) via Google Fonts CDN
- TypeScript

## Routes

| Route | Page |
|---|---|
| `/` | Home — brand anchor + entry tiles |
| `/inbox` | Queued beeps to me (incoming) |
| `/sent` | Beeps I sent + their reply/queued/declined status |
| `/compose` | New beep form — recipient / urgency L·N·H / task / optional transcript request |
| `/access` | Allowlist + `gate` exposed-ports view |

## Design

Brutalist minimalist: pure white surface, black ink, square corners (`* { border-radius: 0 !important }`), high information density. Color/spacing/typography tokens mirror the design-tokens block in the original mocks.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # all routes prerendered as static content
```

## Wiring this to real data (later)

`src/lib/mock-beeps.ts` is the single source of mock data. When the InsForge backend is live:

1. Add `@insforge/sdk` and an `InsforgeClient` provider.
2. Replace `INBOX_BEEPS` / `SENT_BEEPS` exports with `getInboxBeeps()` / `getSentBeeps()` async functions that query the `beeps` table.
3. Wire the compose form's `onSend` to an `insert` (use `crypto.randomUUID()` for the id — InsForge `insert` returns `data:[]`, not the row).
4. Add a `/api/beep` route handler or call the SDK directly from server components.

The page components are server components by default; only `/compose` and the nav components are `"use client"` because they need form state / `usePathname`.
