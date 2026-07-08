# Boulevard Dex

A Pokédex-style collection tracker for the **Hot Wheels Boulevard** reboot — the only Hot Wheels
premium line with continuous numbering across years (#001 in 2020 to #150 and counting). Metal on
metal. Real Riders. Walmart shelves only.

**Live:** https://ilken.github.io/boulevard-dex/

## Features

- **Dex** — all 150 numbered cars as cards with photos, search, year/mix/status filters (shareable
  via URL), odometer stats, and per-year completion.
- **My Garage** — one row per car with Owned and Mint-in-box switches (mint implies owned).
- **Car detail** — hero photo, specs, inline toggles, prev/next dex navigation.
- **Profile** — nickname, city, country, and a Boulevard car as your avatar. Stored in
  localStorage with a versioned schema, ready for trading features later.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · TanStack Router · yarn v1.
Dex data is hardcoded in `src/data/cars.constants.ts` with build-load integrity assertions;
user state lives in localStorage. Brand and motion rules: `BRAND-VOICE.md`, `DESIGN-TOKENS.md`,
`MOTION-SPEC.md`.

## Develop

```sh
yarn          # install
yarn dev      # dev server
yarn validate # typecheck + lint + format check + build
```

Car photos live in `public/cars/{id}.webp` (sourced from the Hot Wheels Fandom wiki;
`node scripts/fetch-images.mjs` refreshes them). Any missing photo falls back to a branded
SVG silhouette matched to the car's body type.
