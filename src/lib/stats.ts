import type { Car, DexYear } from '@/data/dex.types'

import type { CollectionEntry } from './storage.types'

export interface YearStats {
  year: DexYear
  total: number
  owned: number
  mint: number
  pctOwned: number
}

export interface DexStats {
  total: number
  owned: number
  mint: number
  pctOwned: number
  pctMint: number
  byYear: YearStats[]
}

export function computeDexStats(
  cars: readonly Car[],
  entries: Record<string, CollectionEntry>,
): DexStats {
  const byYear = new Map<DexYear, YearStats>()
  let owned = 0
  let mint = 0

  for (const car of cars) {
    let yearStats = byYear.get(car.year)
    if (!yearStats) {
      yearStats = { year: car.year, total: 0, owned: 0, mint: 0, pctOwned: 0 }
      byYear.set(car.year, yearStats)
    }
    yearStats.total += 1

    const entry = entries[String(car.id)]
    if (entry?.owned) {
      owned += 1
      yearStats.owned += 1
    }
    if (entry?.mint) {
      mint += 1
      yearStats.mint += 1
    }
  }

  const years = [...byYear.values()]
  for (const yearStats of years) {
    yearStats.pctOwned = yearStats.total === 0 ? 0 : yearStats.owned / yearStats.total
  }

  return {
    total: cars.length,
    owned,
    mint,
    pctOwned: cars.length === 0 ? 0 : owned / cars.length,
    pctMint: cars.length === 0 ? 0 : mint / cars.length,
    byYear: years,
  }
}
