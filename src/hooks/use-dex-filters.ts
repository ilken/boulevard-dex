import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'

import { CARS } from '@/data/cars.constants'
import type { Car, DexYear, Mix } from '@/data/dex.types'
import { formatDexNumber } from '@/lib/format'
import type { CollectionEntry } from '@/lib/storage.types'

import { useCollection } from './use-collection'

export type StatusFilter = 'owned' | 'missing' | 'mint'

export interface DexSearch {
  q?: string
  year?: DexYear
  mix?: Mix
  status?: StatusFilter
}

const routeApi = getRouteApi('/')

function matchesStatus(
  status: StatusFilter | undefined,
  entry: CollectionEntry | undefined,
): boolean {
  if (!status) return true
  if (status === 'owned') return entry?.owned === true
  if (status === 'mint') return entry?.mint === true
  return !entry?.owned
}

function matchesQuery(query: string, car: Car): boolean {
  const haystack =
    `${car.name} ${car.make ?? ''} ${formatDexNumber(car.id)} ${car.id}`.toLowerCase()
  return haystack.includes(query.toLowerCase())
}

export function useDexFilters() {
  const search = routeApi.useSearch()
  const navigate = useNavigate({ from: '/' })
  const { entries } = useCollection()

  const cars = useMemo(
    () =>
      CARS.filter((car) => {
        if (search.year && car.year !== search.year) return false
        if (search.mix && car.mix !== search.mix) return false
        if (!matchesStatus(search.status, entries[String(car.id)])) return false
        if (search.q && !matchesQuery(search.q, car)) return false
        return true
      }),
    [search, entries],
  )

  function setFilters(partial: Partial<DexSearch>) {
    void navigate({
      search: (previous: DexSearch) => {
        const next = { ...previous, ...partial }
        // Mix chips are scoped to a year; changing year resets the mix.
        if ('year' in partial && partial.year !== previous.year) next.mix = undefined
        return next
      },
      replace: true,
    })
  }

  return { cars, search, setFilters }
}
