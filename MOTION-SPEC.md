# Motion Spec — Boulevard Dex

---

## Core Principles

1. Motion has meaning — it points at what changed (a toggle, a stat, a page).
2. Fast in, slow out. Nothing blocks input.
3. Neon glow transitions are the brand's signature; they appear on interaction, never idle-loop (single exception: the loading shimmer).
4. All decorative motion is a progressive enhancement behind `prefers-reduced-motion: no-preference`.

## Duration Scale

| Token    | Value | Use                   |
| -------- | ----- | --------------------- |
| instant  | 80ms  | toggle ticks, presses |
| fast     | 150ms | hovers, glow-in       |
| normal   | 200ms | overlays              |
| moderate | 300ms | entrances, sweeps     |
| slow     | 450ms | brand moments         |

## Easing Curves

- `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)` — default
- `--ease-decelerate: cubic-bezier(0, 0, 0.2, 1)` — entrances
- `--ease-accelerate: cubic-bezier(0.4, 0, 1, 1)` — exits
- `--ease-expressive: cubic-bezier(0.34, 1.56, 0.64, 1)` — brand moments ONLY (odometer, hero arrival, progress car)

## Element-Specific Rules

### Buttons & Interactive Controls

`active:scale-[0.97]` at 80ms; hover glow at 150ms standard.

### Dropdowns & Popovers

Opacity + translateY(-4px), 200ms decelerate in, 150ms accelerate out.

### Modals & Dialogs

Overlay fade 0→60% at 200ms; panel fade+translateY(8px) 300ms decelerate.

### List Items (Staggered Entrance)

fade-up 300ms decelerate; `delay = index × 20ms`, capped at 10 items / 200ms — items past the cap arrive together.

### Page Transitions

In: fade + translateY(8px), 300ms decelerate. Keep exits instant (router swaps).

### Loading States

Skeleton shimmer 1.5s ease-in-out infinite; the only idle loop allowed.

## Project Animation Inventory

| Animation                    | Where                       | Spec                                                                               |
| ---------------------------- | --------------------------- | ---------------------------------------------------------------------------------- |
| Neon flicker-on (one-shot)   | Wordmark mount              | 900ms steps; two stutters then steady glow                                         |
| Card hover lift + amber glow | CarCard                     | translateY(-4px) rotate(-1deg) scale(1.02) + `--shadow-glow-amber`, 150ms standard |
| Headlight sweep              | CarCard hover / detail hero | skewed light band translates across image, 450ms decelerate                        |
| Car drives progress bar      | StatsStrip                  | fill width 450ms expressive; car SVG rides the leading edge, wheel-bob 700ms loop  |
| Odometer count-up            | Stats                       | rAF 450ms expressive; reduced-motion → instant value                               |
| Toggle pop / mint foil sweep | DexToggle                   | 80ms scale-pop; mint adds 300ms cyan foil gradient sweep                           |
| Detail hero arrival          | CarHero                     | scale 0.96→1 + fade, 450ms expressive                                              |
| Page fade-up                 | route mount                 | 300ms decelerate                                                                   |
| Skeleton shimmer             | CarImage loading            | 1.5s infinite                                                                      |

## Tailwind Implementation

Durations/easings/keyframes live in `@theme` in `src/styles/index.css` as `--ease-*` and `--animate-*`; use `animate-fade-up`, `ease-expressive`, `duration-150`, etc.

## Reduced Motion

Global CSS kill switch in `index.css` zeroes all animation/transition durations. JS-driven motion (odometer, tilt) additionally gates via the `useReducedMotion` hook.

## Banned Patterns

- Overshoot/bounce outside `--ease-expressive` brand moments
- Animating layout properties (width/height/top/left) — transform/opacity only
- More than 5 simultaneous un-staggered animations
- Idle looping glow or pulse (shimmer excepted)
- Durations over 450ms
