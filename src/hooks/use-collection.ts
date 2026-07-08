import { useMemo, useSyncExternalStore } from 'react'

import { CARS } from '@/data/cars.constants'
import { computeDexStats, type DexStats } from '@/lib/stats'
import { createLocalStore } from '@/lib/storage'
import { COLLECTION_KEY, EMPTY_COLLECTION } from '@/lib/storage.constants'
import type { CollectionEntry } from '@/lib/storage.types'

const store = createLocalStore(COLLECTION_KEY, EMPTY_COLLECTION)

function entryFor(carId: number, entries: Record<string, CollectionEntry>): CollectionEntry {
  return entries[String(carId)] ?? { owned: false, mint: false, updatedAt: '' }
}

export function toggleOwned(carId: number): void {
  store.update((previous) => {
    const entry = entryFor(carId, previous.cars)
    const owned = !entry.owned
    return {
      ...previous,
      cars: {
        ...previous.cars,
        // Letting go of the car also lets go of its mint status.
        [String(carId)]: { owned, mint: owned && entry.mint, updatedAt: new Date().toISOString() },
      },
    }
  })
}

export function toggleMint(carId: number): void {
  store.update((previous) => {
    const entry = entryFor(carId, previous.cars)
    const mint = !entry.mint
    return {
      ...previous,
      cars: {
        ...previous.cars,
        // Mint-in-box implies you own it.
        [String(carId)]: { owned: mint || entry.owned, mint, updatedAt: new Date().toISOString() },
      },
    }
  })
}

export function useCollection(): {
  entries: Record<string, CollectionEntry>
  stats: DexStats
  isOwned: (carId: number) => boolean
  isMint: (carId: number) => boolean
} {
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return useMemo(
    () => ({
      entries: snapshot.cars,
      stats: computeDexStats(CARS, snapshot.cars),
      isOwned: (carId: number) => entryFor(carId, snapshot.cars).owned,
      isMint: (carId: number) => entryFor(carId, snapshot.cars).mint,
    }),
    [snapshot],
  )
}
