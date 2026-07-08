import { DEX_YEARS, MIXES_BY_YEAR } from '@/data/cars.constants'
import type { DexSearch } from '@/hooks/use-dex-filters'

import { SEARCH_PLACEHOLDER, STATUS_FILTERS } from './dex-filters.constants'

interface DexFiltersProps {
  search: DexSearch
  onChange: (partial: Partial<DexSearch>) => void
}

function chipClass(active: boolean): string {
  return `shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
    active
      ? 'border-neon-amber bg-neon-amber text-on-neon-amber'
      : 'border-outline-variant bg-surface-1 text-on-surface-variant hover:border-outline hover:text-on-surface'
  }`
}

export function DexFilters({ search, onChange }: DexFiltersProps) {
  const mixes = search.year ? (MIXES_BY_YEAR.get(search.year) ?? []) : []

  return (
    <section aria-label="Filters" className="space-y-3">
      <input
        type="search"
        value={search.q ?? ''}
        onChange={(event) => onChange({ q: event.target.value || undefined })}
        placeholder={SEARCH_PLACEHOLDER}
        aria-label="Search the dex"
        className="w-full rounded-lg border border-outline-variant bg-surface-1 px-4 py-2.5 text-sm text-on-surface placeholder:text-muted focus:border-neon-amber sm:max-w-sm"
      />

      <div className="flex flex-wrap items-center gap-2">
        {DEX_YEARS.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => onChange({ year: search.year === year ? undefined : year })}
            aria-pressed={search.year === year}
            className={chipClass(search.year === year)}
          >
            {year}
          </button>
        ))}

        {mixes.length > 0 && <span aria-hidden className="h-5 w-px bg-outline-variant" />}
        {mixes.map((mix) => (
          <button
            key={mix}
            type="button"
            onClick={() => onChange({ mix: search.mix === mix ? undefined : mix })}
            aria-pressed={search.mix === mix}
            className={chipClass(search.mix === mix)}
          >
            Mix {mix}
          </button>
        ))}

        <span aria-hidden className="h-5 w-px bg-outline-variant" />
        {STATUS_FILTERS.map((status) => (
          <button
            key={status.value}
            type="button"
            onClick={() =>
              onChange({ status: search.status === status.value ? undefined : status.value })
            }
            aria-pressed={search.status === status.value}
            className={chipClass(search.status === status.value)}
          >
            {status.label}
          </button>
        ))}
      </div>
    </section>
  )
}
