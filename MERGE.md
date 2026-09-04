# Complete project

**Replace the whole folder.** Don't merge file by file — two components were
deleted in an earlier pass and merging would leave them behind.

```
Keep your .env — it is NOT in this package.
```

```bash
npm install
npm run dev
```

## What's new in this build

**The dashboard is a dashboard.**

```
Wednesday, September 3 — Hello, Michael
10 people are waiting.                   ← terrain as a band, not a screen

[ 3 Overdue ][ 7 New ][ 2 Going cold ][ 12 Active ]

┌── Who to reach ──────────┐  ┌── Deadlines ─────┐
│ the call list, wide       │  ├── Reminders ─────┤
│                           │  ├── Did this close?┤
└───────────────────────────┘  └── Worth a call ──┘
```

Stats are above the fold and clickable. Deadlines moved beside the work rather
than above it. Single column below 1000px.

**Page archetypes are in `system.css` but not yet applied.** `.pg-head`,
`.pg-tools`, `.pg-list`, `.pg-detail`, `.pg-form` — the four shapes covering all
thirteen pages. Only the dashboard uses the new system so far.

## Deleted — do not restore
```
app/components/app/VoiceCapture.vue    superseded by VoiceDock
app/components/base/VoiceField.vue     superseded by VoiceDock
```

## Unused but left alone — your call
```
app/components/app/CardsOverview.vue
app/components/app/appReminderEmail.vue
app/components/base/maps.vue
app/components/base/EngineActive.vue
```
Nothing references these. `appReminderEmail` may be a template you intended for
the email pipeline — worth checking before removing.

## Verified before packaging
```
every import resolves      server, app, lib — relative, ~/ and ~~/
every .ts and .vue parses  esbuild, the same parser npm run build uses
templates balanced         across all 44 components
no .env, no node_modules
```

## Known gaps
- **Nav is still seven items.** Today / People / Setup is designed, not built.
- **List pages still use their old markup** — leads, homes, campaigns, social.
  The archetypes exist; applying them is the next pass.
- `status` and `stage` both exist. Intentional — the briefing runs on `status`,
  and migrating both at once would break the morning call list.
- The iPad navbar issue is unresolved, paused at your call.
