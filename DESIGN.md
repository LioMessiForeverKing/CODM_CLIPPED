# Design System — Clipped

## Product Context
- **What this is:** Community-driven CODM loadout leaderboard with weapon stats and a loadout builder
- **Who it's for:** Call of Duty: Mobile players, primarily the r/CallOfDutyMobile community (400k+ members)
- **Space/industry:** Gaming community tools, loadout builders, meta trackers
- **Project type:** Web app (Next.js 14, dark mode only)

## Aesthetic Direction
- **Direction:** Retro-Futuristic / Industrial HUD
- **Decoration level:** Intentional (subtle grain overlay, scanline hint on hero, orange glow on hover)
- **Mood:** Dark, tactical, data-dense. Like an in-game weapon customization screen, not a SaaS dashboard. The product should feel like it belongs next to COD itself.
- **Reference sites:** CODMunity.gg (loadout tool), tracker.gg (stat tracker), blitz.gg (gaming analytics)

## Typography
- **Display/Hero:** Barlow Condensed (700/800) — tight, bold, military-adjacent. Uppercase for all weapon names and headings.
- **Body:** Inter (400/500/600) — clean readability at small sizes.
- **UI/Labels:** Inter (500/600) — same as body, uppercase for labels with letter-spacing.
- **Data/Tables:** JetBrains Mono (400/500/700) — tabular-nums for aligned numbers. Stats, vote counts, attachment names.
- **Code:** JetBrains Mono
- **Loading:** Google Fonts CDN: `Barlow+Condensed:wght@400;500;600;700;800`, `Inter:wght@300;400;500;600;700`, `JetBrains+Mono:wght@400;500;700`
- **Scale:**
  - Hero: 56px / 800 / Barlow Condensed (36px on mobile)
  - Section heading: 32px / 700 / Barlow Condensed (24px on mobile)
  - Card title: 20px / 700 / Barlow Condensed, uppercase
  - Body: 14px / 400 / Inter
  - Small/muted: 12px / 400 / Inter
  - Stat labels: 12px / 500 / JetBrains Mono, uppercase
  - Stat values: 12px / 400 / JetBrains Mono
  - Vote count: 16px / 700 / JetBrains Mono
  - Badge text: 10px / 500 / JetBrains Mono, uppercase, letter-spacing 1px

## Color
- **Approach:** Restrained + 1 expressive accent
- **Background:** `#0A0A0A` — deep matte black, the base of everything
- **Surface 1:** `#111111` — card and panel backgrounds
- **Surface 2:** `#141414` — elevated surfaces, form inputs
- **Border:** `#222222` — subtle dividers and card borders
- **Primary text:** `#F5F5F5` — cold white, high contrast on dark
- **Muted text:** `#888888` — secondary information, timestamps, labels
- **Dim text:** `#555555` — tertiary, slot type labels
- **Accent:** `#FF6B00` — COD's signature electric orange. Used sparingly: CTA buttons, active states, hover glows, progress indicators.
- **Accent hover:** `#E86200` — darkened accent for button hover
- **Accent glow:** `rgba(255, 107, 0, 0.4)` — border glow on card hover
- **Success:** `#00C896` — upvotes, positive stat deltas, success alerts
- **Danger:** `#FF3B3B` — downvotes, negative stat deltas, error alerts
- **Warning:** `#FFAA00` — caution states
- **Info:** `#6495ED` — informational alerts
- **Dark mode:** Dark mode only. No light mode. This is a gaming product.
- **Accessibility:** `#FF6B00` on `#0A0A0A` is 4.2:1 contrast, below WCAG AA for small text. Use orange ONLY on text 18px+ or as decorative accents. All small readable text must use `#F5F5F5` on dark backgrounds.

## Spacing
- **Base unit:** 4px
- **Density:** Comfortable
- **Scale:** 2xs(2px) xs(4px) sm(8px) md(16px) lg(24px) xl(32px) 2xl(48px) 3xl(64px)
- **Card padding:** 20px
- **Grid gap:** 16px (mobile) / 24px (desktop)
- **Section vertical spacing:** 48px between major sections
- **Nav height:** ~52px

## Layout
- **Approach:** Grid-disciplined
- **Grid:** 2 columns (desktop, 768px+) / 1 column (mobile, <768px)
- **Max content width:** 1280px, centered
- **Border radius:**
  - sm: 4px (buttons, badges, inputs)
  - md: 8px (cards, panels) — this is the maximum. No larger radii. Tactical, not friendly.
  - full: 9999px (pills, only if needed)
- **Navigation:** Slim sticky top bar, not a sidebar.
- **Desktop nav:** Wordmark left, season selector center-right, CTA button right.
- **Mobile nav:** Wordmark left, orange "+" icon button right. Season selector hidden (shown when 2+ seasons).

## Motion
- **Approach:** Intentional
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150-250ms) medium(250-400ms) long(400-700ms)
- **Stat bar fill:** 0.8s ease-out, staggered 50ms per bar (sliding fill from left)
- **Card hover:** 200ms border-color transition to accent-glow
- **Button hover:** 200ms background-color transition
- **Builder step transitions:** 150ms fade-slide (forward: fade-in from right, back: fade-in from left)
- **Loading skeletons:** Subtle pulse animation on dark palette. No white spinners.
- **Grain overlay:** CSS SVG noise filter at 3% opacity on body background. Cut if it causes jank on low-end mobile.

## Component Patterns
- **Loadout cards:** Dark surface with 1px border. Orange glow on hover. Weapon name uppercase at top. 5 attachment rows. Vote buttons in footer.
- **Stat bars:** Horizontal fill bars, 6px height, accent color fill, monospace labels and values.
- **Vote buttons:** Vertical stack [up arrow] [count] [down arrow]. SVG icons 16px. Active states: success/danger colors. Min 44x44px tap target.
- **Filter tabs:** Horizontal row, no gap between tabs. Active tab: accent color + accent background at 8% opacity.
- **Badges:** 10px monospace text, 1px border, muted colors. Season badge (gray), playstyle badge (orange border).
- **Form inputs:** Surface-2 background, 1px border, accent border on focus. 14px Inter.
- **Alerts:** 1px semantic-colored border, 8% semantic-colored background, semantic text color.
- **Empty states:** Centered message with muted text + primary CTA button. Not just "No items found."
- **Loading skeletons:** Match card shapes with dark pulse animation.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-27 | Initial design system created | Formalized from CLAUDE.md design specs via /design-consultation. Retro-futuristic HUD aesthetic to match COD's visual language. |
| 2026-03-27 | Barlow Condensed as display font | Military-adjacent, tight uppercase energy. Differentiates from generic sans-serif gaming tools. |
| 2026-03-27 | Single accent color (#FF6B00) | COD's signature orange. Bold, memorable, immediately associated with the franchise. Limited color vocabulary accepted as Phase 1 constraint. |
| 2026-03-27 | Dark mode only | Gaming product for mobile gamers. No light mode needed. Every gaming tool in the space is dark-only. |
| 2026-03-27 | Max border-radius 8px | Tactical aesthetic. No bubbly rounded corners. Cards and panels feel structured, not friendly. |
| 2026-03-27 | JetBrains Mono for all data | Tabular-nums for aligned stat numbers. Consistent monospace across stats, votes, badges, and attachment names. |
