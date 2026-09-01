# GhostForm Dashboard

Lead capture and follow-up for realtors. Captures leads anywhere — including
without signal — ranks them each morning, and reads contract deadlines out of
uploaded documents.

Nuxt 4 · TypeScript · MongoDB · Cloudflare R2

---

## Getting started

```bash
npm install
cp .env.example .env    # fill it in — see below
npm run dev
```

> **If `npm run dev` fails with `oxc-walker: could not resolve a parseSync
> implementation`, or a `ParseError` in `nuxt.config.ts`:**
>
> ```bash
> npm install oxc-parser
> ```
>
> These are the same bug. `oxc-walker` parses `nuxt.config.ts`, so when it
> can't find a parser it reports the failure as a syntax error at whatever line
> it reached — the config is fine. `oxc-parser` is an **optional peer
> dependency**, which npm never installs automatically, so wiping
> `node_modules` won't fix it.

### Environment

Minimum to boot:

```dotenv
MONGO_URI=
NUXT_SESSION_PASSWORD=      # 32+ characters
OPENAI_API_KEY=             # captions, voice notes, lead analysis
ANTHROPIC_API_KEY=          # reading PDFs
```

Everything else (`STRIPE_*`, `RESEND_KEY`, `RENTCAST_API_KEY`, `CRON_SECRET`)
gates a specific feature and can wait.

**Document storage is optional in development.** With no `R2_*` keys the app
writes to `.data/uploads` on disk, and the whole upload → read → deadline flow
works. You only need Cloudflare to deploy:

```dotenv
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
```

Check which driver is live at `/api/documents/diagnose`.

---

## Layout

```
app/
  components/     app/ = feature, base/ = reusable
  composables/    useVoiceInput, useUpload
  pages/          file-based routing
  utils/          loggedInUser, documentRead, priority, ai/
lib/database/     models + the cached Mongo connection
server/
  api/            endpoints
  utils/          storage, dailyBriefing, leadAnalysis, …
```

**`~/utils/X` resolves to `app/utils/X`** — Nuxt 4's `srcDir` is `app/`. Server
utils are auto-imported, but see the caveat below.

---

## Conventions worth knowing

These are all the result of a bug. Following them avoids repeating it.

### Authenticated fetches must be client-only

```ts
useFetch('/api/whatever', { server: false, lazy: true })
```

The session lives in a cookie the SSR pass doesn't forward, so a server-side
fetch gets a 401. The symptom is data that **disappears on hard reload and
returns when you navigate back** — the client-side fetch works because the
browser sends the cookie.

Don't paper over it with `default: () => []`. That turns an auth failure into
an empty result and hides the next one.

### Import server utils explicitly inside closures

Nitro auto-imports `server/utils`, but the scan misses calls nested inside
callbacks:

```ts
const run = async () => {
  const file = await fetchAsBase64(key)   // ← not auto-imported here
}
```

Explicit imports also fail at *build* rather than at runtime when a user is
mid-upload.

### One AI helper per job

- **Text in, text out** → `useOpenAi()` in `app/utils/ai/openAi/`
- **Reading a PDF** → Anthropic, in `documentRead.ts`

That split is a capability difference — PDF document blocks — not a preference.
Don't hand-roll a third `$fetch` call.

### Credentials come from `process.env` in server files

Not `useRuntimeConfig()`. Private runtimeConfig keys aren't exposed to the
client, so this isn't a security fix — it's consistency, since the AI helpers
already work this way.

### Type scale

Six sizes: `gf-display-lg` / `gf-title` / `gf-lead` / `gf-body` / `gf-meta` /
`gf-label`. If something doesn't fit, change its **rank** rather than inventing
a new size. There were 31 distinct font sizes before this existed.

---

## Documents and deadlines

Uploading a contract extracts its dates. **Nothing becomes a reminder until the
realtor confirms it.**

Each extracted date carries `sourceText` — the sentence it came from, verbatim.
A misread inspection contingency is a missed deadline with real money attached,
and the liability is the agent's, so they check our work rather than trusting
it.

Consequences of that rule:

- Unconfirmed deadlines **do not appear** in the daily briefing
- Correcting a date implies confirming it
- Voice-created reminders work the same way, but *do* show unconfirmed —
  someone who spoke a reminder an hour ago already knows about it

### Priority

Urgency comes from the **date**; stakes come from the AI. They're different
axes, and conflating them meant a closing six weeks out showed as "DO NOW".

`Do now` only ever means overdue, today, or tomorrow.

---

## Testing documents

There's a mock purchase agreement with seven deadlines spanning overdue →
urgent → far off, plus deliberate traps: a relative date with no fixed day, two
dates that aren't deadlines, and a fake SSN that must be redacted.

The test worth running first: **upload it, confirm nothing, and check the daily
briefing.** It should show nothing at all.

---

## Deploying

- `npm run build` (memory is raised to 4GB — the build needs it)
- R2 credentials are required; local disk is per-instance and ephemeral
- Documents don't need a public bucket domain. They're only fetched
  server-side, and presigned URLs are the safer choice for contracts.
- Set a lifecycle rule on the bucket once real clients exist. Holding a
  stranger's financials indefinitely is a liability, not a feature.

---

## Gotchas

| Symptom | Cause |
|---|---|
| `oxc-walker: could not resolve a parseSync` | `npm install oxc-parser` |
| `ParseError` in `nuxt.config.ts` | Same thing — the config is fine |
| `useUserSession is not defined` | Module missing from `nuxt.config.ts` `modules[]` |
| Data vanishes on hard reload | Authenticated fetch needs `server: false` |
| `Upload failed (404)` | Local upload routes missing — `server/api/uploads/local/` |
| "Could not read the file from storage" | `fetchAsBase64` reading a relative URL |
| Documents fail after adding R2 | Old files are in `.data/uploads`; re-upload them |
