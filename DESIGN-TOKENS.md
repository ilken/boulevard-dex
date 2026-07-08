# Design Tokens — Boulevard Dex

Single source of truth. All values live as CSS custom properties in `src/styles/index.css` (Tailwind v4 `@theme`). Dark mode only — these ARE the `:root` values; there is no `.dark` machinery. No raw hex outside `index.css`.

---

## Color Palette

### Semantic color scale

| Token                        | Value     | Use                                                                   |
| ---------------------------- | --------- | --------------------------------------------------------------------- |
| `--color-asphalt`            | `#0A0E17` | page background                                                       |
| `--color-asphalt-sunken`     | `#060912` | recessed areas, page edges                                            |
| `--color-surface-1`          | `#0E1322` | raised sections                                                       |
| `--color-surface-2`          | `#121A2E` | cards                                                                 |
| `--color-surface-3`          | `#16203A` | card hover / chips                                                    |
| `--color-surface-4`          | `#1B2745` | overlays, modals                                                      |
| `--color-surface-5`          | `#223052` | highest elevation                                                     |
| `--color-neon-amber`         | `#FFC24B` | primary — the Boulevard script glow; CTAs, active states, dex numbers |
| `--color-on-neon-amber`      | `#0A0E17` | text on amber                                                         |
| `--color-neon-pink`          | `#FF4D8D` | secondary — taillight accent; speed lines, secondary highlights       |
| `--color-streetlight`        | `#5BE1E6` | tertiary — mint/in-box state, cool accents                            |
| `--color-on-surface`         | `#EEF1F8` | primary text                                                          |
| `--color-on-surface-variant` | `#98A3BF` | secondary text                                                        |
| `--color-muted`              | `#5F6A84` | disabled/placeholder                                                  |
| `--color-outline`            | `#39466B` | borders                                                               |
| `--color-outline-variant`    | `#232C48` | subtle borders, dividers                                              |

Status: success `#22C55E`, warning `#F59E0B`, error `#EF4444`, info `#3B82F6`.

Neon glow shadows (hover + brand moments only): `--shadow-glow-amber`, `--shadow-glow-pink`, `--shadow-glow-cyan` (2px core + 12px halo + 32px bloom).

### Dark mode overrides

None — dark only.

---

## Spacing Grid

Base unit **4px**. Use Tailwind's default 4px-based scale (`p-1` = 4px … `p-24` = 96px). Multiples of 4 only; no arbitrary values like `px-[13px]`.

---

## Typography Scale

Montserrat (300–800). 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48px via Tailwind `text-xs`–`text-5xl`. Leading: tight 1.2 (display), normal 1.5 (body). Tracking wide 0.05em for dex-number labels.

---

## Border Radius

`rounded-sm` 4px (chips) · `rounded-lg` 8px (buttons, inputs) · `rounded-xl` 12px (cards, modals) · `rounded-full` (avatar ring, toggles).

---

## Elevation / Shadow

`--shadow-card: 0 8px 30px rgb(0 0 0 / 0.35)` for cards; glows (above) express elevation on interaction instead of larger drop shadows. Focus ring: `--shadow-focus: 0 0 0 3px rgb(255 194 75 / 0.4)`.

---

## Tailwind Extension

Tailwind v4: all tokens declared in `@theme` in `src/styles/index.css`; utilities like `bg-asphalt`, `text-neon-amber`, `shadow-glow-cyan`, `ease-expressive`, `animate-fade-up` are generated from them. No `tailwind.config.ts`.
