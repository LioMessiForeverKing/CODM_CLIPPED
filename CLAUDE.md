# CLAUDE.md — Clipped

## What Is Clipped

Clipped is a community-driven web platform for Call of Duty: Mobile players to discover, build, submit, and rank weapon loadouts by season. It also displays real weapon stats (damage, range, fire rate, accuracy, mobility, control) per gun, per season, so players always know what is actually strong right now — not what was strong three patches ago.

The name is Clipped. The domain is clipped.gg (preferred) or clipped.io.

This is the product to build and ship. Not a prototype. Not an MVP with placeholder UI. A real, polished, game-themed web app that looks like it belongs next to COD itself.

---

## The Problem It Solves

Right now, finding the best CODM loadout means watching a YouTube video that might be outdated, digging through a Reddit thread that is buried, or asking in Discord and hoping someone responds. There is no single source of truth for what is actually meta this season.

Clipped fixes that. It is the leaderboard for CODM loadouts, with real weapon stats behind every build, updated per season.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Database + Backend | Convex (real-time, serverless, file storage) |
| Image Parsing | Python FastAPI + OpenCV + easyocr |
| Auth | Convex Auth (Phase 2) |
| Hosting | Vercel (frontend), Railway or Fly.io (Python service) |

Do not deviate from this stack. Convex is a core learning goal for this project and must be used as the primary database and backend. No Supabase, no Firebase, no Prisma.

---

## Design Language

This is the most important section. The UI must feel like a premium gaming product, not a generic SaaS dashboard. Study the aesthetic of games like COD, Valorant, and Apex Legends for reference.

### Color Palette
- Background: deep matte black `#0A0A0A`
- Surface cards: dark gunmetal `#111111` or `#141414`
- Border/divider: subtle `#222222`
- Primary accent: electric orange `#FF6B00` (COD's signature orange energy)
- Secondary accent: cold white `#F5F5F5`
- Muted text: `#888888`
- Danger/downvote: `#FF3B3B`
- Success/upvote: `#00C896`

### Typography
- Headings: `Barlow Condensed` or `Rajdhani` — bold, tight, military-adjacent
- Body: `Inter` — clean and readable
- Stats and numbers: monospace, use `JetBrains Mono` or `IBM Plex Mono`
- All weapon names and loadout titles should be uppercase or small-caps

### Visual Style
- Heavy use of dark cards with thin glowing borders on hover (orange glow `#FF6B00` at 40% opacity)
- Subtle noise/grain texture overlay on the background (CSS grain effect, very faint)
- Weapon stat bars animate in on load — sliding fill, not static
- Loadout cards feel like in-game attachment cards — dark, structured, with a clear weapon name and icon area
- No rounded corners larger than `rounded-lg` (8px) — tactical, not friendly
- Micro-interactions everywhere: hover states, active states, button press feedback
- Loading skeletons use the same dark palette — no white spinners
- Subtle scanline or grid overlay on hero sections for a HUD-like feel

### Layout
- Max content width: 1280px, centered
- Navigation is a slim top bar, not a sidebar
- Leaderboard homepage: two-column card grid on desktop, single column on mobile
- Weapon stat panels use horizontal animated bar charts, not pie charts

---

## Pages to Build

### 1. `/` — Leaderboard (Homepage)
This is the most important page. It must load fast and look incredible.

- Sticky top nav with the Clipped wordmark logo, a season selector dropdown, and a "Submit Loadout" CTA button in orange
- Hero section: large display text showing the current season name and the top weapon of the season with its stat bars animated in below it
- Filter bar: weapon category tabs (ALL / AR / SMG / SNIPER / LMG / SHOTGUN / PISTOL) and a playstyle filter (Aggressive / Long Range / Support / Balanced)
- Grid of loadout cards sorted by net upvotes, paginated at 12 per page
- Each loadout card shows:
  - Weapon name (large, uppercase)
  - Season tag (small badge top right of card)
  - Playstyle tag
  - Five attachment slots, each showing slot type and attachment name
  - Net upvote count with upvote and downvote buttons
  - Submitted by (username or "Anonymous")
  - A "View Stats" link

### 2. `/build` — Loadout Builder
The interactive loadout creation experience.

Step-based flow:
- Step 1: Choose weapon category — large clickable tiles with category label and a gun silhouette icon
- Step 2: Choose base weapon from that category — card grid, each card shows weapon name and its core stat bars at a glance
- Step 3: Fill attachment slots — labeled dropdown per slot type. Only show slots that exist for the chosen weapon.
- Step 4: Add metadata — playstyle tag, season (auto-filled to current), optional short description
- Step 5: Preview card — shows exactly how the loadout card will appear on the leaderboard, with a Submit button in orange

The builder shows live stat delta indicators as attachments are selected. For example: selecting a barrel shows Damage +5 and Range -2 as small colored tags next to the slot. These pull from the weapon's attachment stat modifiers in the data file.

### 3. `/upload` — Screenshot Parser
- Centered drag-and-drop zone
- Instruction: "Drop your CODM loadout screenshot and we'll read your attachments automatically"
- Supported: JPG or PNG, 1080x1920 portrait screenshots only (Phase 1)
- On upload: sends to Python FastAPI, shows a scanning animation with a horizontal sweep line across the image (like a scanner), then pre-fills the `/build` form
- User reviews and confirms before submitting — they always have final control

### 4. `/weapons` — Weapon Stats Encyclopedia
- Full weapon list organized by category tabs
- Each weapon row or card shows animated stat bars (Damage, Range, Fire Rate, Accuracy, Mobility, Control) on a 0-100 scale
- Season filter at the top to compare stats across seasons
- Clicking any weapon goes to `/weapons/[slug]`

### 5. `/weapons/[slug]` — Single Weapon Detail
- Full stat breakdown for the selected weapon and season
- Stat change timeline: a vertical log showing what changed each season (e.g., "S12 — Damage nerfed 82 to 74")
- Top 3 loadouts for this weapon this season, pulled from Convex
- Full attachment list organized by slot type

### 6. `/loadout/[id]` — Single Loadout Detail
- Full loadout card, expanded
- Weapon stat bars displayed alongside the attachment list
- Upvote / downvote buttons
- Season and playstyle tag
- Submitted by and description
- Share button — generates a 1080x1080 PNG export card for Instagram and TikTok
- Related loadouts section (same weapon, same season, sorted by upvotes)

---

## Convex Data Model

### `weapons` table
```
{
  _id: Id<"weapons">,
  name: string,                  // "AK-47"
  slug: string,                  // "ak-47"
  category: string,              // "assault_rifle"
  seasons: {
    [seasonId: string]: {
      damage: number,
      range: number,
      fireRate: number,
      accuracy: number,
      mobility: number,
      control: number,
    }
  },
  attachmentSlots: string[],
  availableAttachments: {
    [slot: string]: string[]
  },
  imageUrl?: string,
}
```

### `loadouts` table
```
{
  _id: Id<"loadouts">,
  weaponId: Id<"weapons">,
  weaponName: string,
  category: string,
  attachments: {
    muzzle?: string,
    barrel?: string,
    stock?: string,
    grip?: string,
    ammunition?: string,
    laser?: string,
    perk?: string,
    rear_grip?: string,
  },
  playstyle: string,
  season: string,                // "S14 2025"
  description: string,
  submittedBy: string,           // "anonymous" or userId
  upvotes: number,
  downvotes: number,
  createdAt: number,
  parsedFromScreenshot: boolean,
}
```

### `votes` table
```
{
  _id: Id<"votes">,
  loadoutId: Id<"loadouts">,
  voterIp: string,               // hashed
  vote: "up" | "down",
  createdAt: number,
}
```

### `seasons` table
```
{
  _id: Id<"seasons">,
  name: string,                  // "S14 2025"
  slug: string,                  // "s14-2025"
  startDate: number,
  endDate: number,
  isCurrent: boolean,
}
```

---

## OpenCV Screenshot Parser Service

A separate Python FastAPI service deployed independently.

### Stack
- Python 3.11
- FastAPI
- OpenCV (cv2)
- easyocr (preferred over pytesseract for CODM's stylized font)

### Endpoint
`POST /parse-loadout`
- Input: multipart form with image file
- Output: `{ weapon: string, attachments: object, confidence: number }`

### Processing Pipeline
1. Load image with cv2
2. Convert to grayscale, apply adaptive thresholding
3. Crop attachment regions based on fixed CODM UI coordinates (calibrated for 1080x1920)
4. Run easyocr on each cropped region
5. Fuzzy match extracted strings against local weapons dictionary
6. Return best matches as structured JSON

### Phase 1 Constraint
Only 1080x1920 screenshots are supported. State this clearly in the UI on the upload page.

---

## Weapon + Attachment Data

Stored as `/data/weapons.json` in the repo. This is the source of truth for all dropdowns and OCR fuzzy matching.

Seed from the Kaggle CODM weapons dataset (90 guns with base stats) and enrich manually for attachments. Data is versioned by season — new seasons add entries to the `seasons` map, never overwrite. Old loadouts always render correctly.

---

## Shared Config

Create `/lib/config.ts`:
```ts
export const CURRENT_SEASON = "S14 2025"
export const CURRENT_SEASON_SLUG = "s14-2025"
export const WEAPON_CATEGORIES = [
  "assault_rifle", "smg", "sniper", "lmg", "shotgun", "pistol", "marksman"
]
export const PLAYSTYLES = ["aggressive", "long-range", "support", "balanced"]
```

---

## Build Phases

### Phase 1 — Core (Ship This)
- [ ] Initialize Next.js 14 + Convex
- [ ] Set up Tailwind with Clipped design tokens in `tailwind.config.ts`
- [ ] Seed `weapons.json` with top 15 meta weapons and attachments
- [ ] Seed Convex `weapons` table via a seed script
- [ ] Build `/build` loadout builder end to end
- [ ] Wire builder to Convex mutations
- [ ] Build `/` leaderboard with real Convex queries
- [ ] Add voting with IP-based rate limiting
- [ ] Build `/weapons` and `/weapons/[slug]`
- [ ] Deploy to Vercel

### Phase 2 — Screenshot Parser
- [ ] Set up FastAPI Python project
- [ ] Implement OpenCV + easyocr pipeline
- [ ] Build `/upload` page in Next.js
- [ ] Connect to Python service, pre-fill builder from parsed result
- [ ] Deploy Python service to Railway

### Phase 3 — Polish + Distribution
- [ ] Shareable loadout image card export using Satori or html-to-image
- [ ] Export card: 1080x1080, dark themed, Clipped wordmark watermark bottom right
- [ ] Stat change timeline on `/weapons/[slug]`
- [ ] Post on Reddit: r/CallOfDutyMobile
- [ ] Drop links in YouTube comments on meta loadout videos
- [ ] Instagram and TikTok: post top 3 loadouts of the week as exported cards

---

## Social Content Strategy

The shareable card export powers all social. Every `/loadout/[id]` page has a Share button generating a 1080x1080 PNG in the Clipped design language.

Weekly cadence:
- Monday: Top loadout of the week by upvotes
- Wednesday: Hidden gem — highest-rated loadout with under 50 votes
- Friday: Stat drop — if a weapon got patched this week, show before and after numbers as a graphic

TikTok: screen recordings of the loadout builder and stat pages with text overlay or voiceover. The product is the content.

Instagram handle: @clipped.gg
TikTok handle: @clippedgg

---

## Code Style + Conventions

- TypeScript everywhere, strict mode on
- All Convex functions in `/convex` — queries in `queries.ts`, mutations in `mutations.ts`
- Page components in `/app` following App Router conventions
- Reusable components in `/components/ui` (shadcn) and `/components/app` (custom)
- Tailwind classes only — no inline styles
- Every Convex-powered page has a loading skeleton matching the final layout shape
- Mobile-first responsive — the leaderboard must work fully on a phone screen

---

## Developer Notes

- The Python OCR service is stateless. It never writes to Convex. The Next.js frontend owns all Convex writes after the user confirms parsed results.
- Normalize all weapon stats to a 0-100 scale before displaying. Store raw values in Convex, normalize at render time.
- Season tag on a submitted loadout is immutable. Never auto-update it.
- Keep a `CHANGELOG.md` logging all weapon data changes per season so users can trust the numbers.
- The Clipped wordmark uses Barlow Condensed Bold, all caps. The letter O in Clipped is rendered in the orange accent color `#FF6B00` as a subtle nod to a gun barrel.
