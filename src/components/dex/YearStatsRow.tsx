import { formatPercent } from '@/lib/format'
import type { YearStats } from '@/lib/stats'

interface YearStatsRowProps {
  byYear: YearStats[]
}

export function YearStatsRow({ byYear }: YearStatsRowProps) {
  return (
    <ul className="flex gap-2 overflow-x-auto pb-1" aria-label="Progress by release year">
      {byYear.map((year) => (
        <li
          key={year.year}
          className="flex shrink-0 items-baseline gap-2 rounded-lg border border-outline-variant bg-surface-1 px-3 py-2"
        >
          <span className="text-sm font-extrabold text-on-surface">{year.year}</span>
          <span className="text-xs font-semibold text-neon-amber">
            {year.owned}/{year.total}
          </span>
          {year.mint > 0 && (
            <span className="text-xs font-semibold text-streetlight">{year.mint} mint</span>
          )}
          <span className="text-xs text-on-surface-variant">{formatPercent(year.pctOwned)}</span>
        </li>
      ))}
    </ul>
  )
}
