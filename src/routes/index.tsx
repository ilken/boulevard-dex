import { createFileRoute } from '@tanstack/react-router'

import { DexFilters } from '@/components/dex/DexFilters'
import { DexGrid } from '@/components/dex/DexGrid'
import { DexHeader } from '@/components/dex/DexHeader'
import { StatsStrip } from '@/components/dex/StatsStrip'
import { DEX_YEARS, MIXES_BY_YEAR } from '@/data/cars.constants'
import type { DexYear, Mix } from '@/data/dex.types'
import { type DexSearch, useDexFilters } from '@/hooks/use-dex-filters'

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): DexSearch => {
    const year = DEX_YEARS.find((candidate) => candidate === Number(search.year)) as
      DexYear | undefined
    const mixes = year ? (MIXES_BY_YEAR.get(year) ?? []) : []
    return {
      q: typeof search.q === 'string' && search.q !== '' ? search.q : undefined,
      year,
      mix: mixes.find((candidate) => candidate === search.mix) as Mix | undefined,
      status:
        search.status === 'owned' || search.status === 'missing' || search.status === 'mint'
          ? search.status
          : undefined,
    }
  },
  component: DexPage,
})

function DexPage() {
  const { cars, search, setFilters } = useDexFilters()

  return (
    <div className="space-y-6">
      <DexHeader />
      <StatsStrip />
      <DexFilters search={search} onChange={setFilters} />
      <DexGrid cars={cars} />
    </div>
  )
}
