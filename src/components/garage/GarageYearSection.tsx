import type { Car } from '@/data/dex.types'
import { useCollection } from '@/hooks/use-collection'

import { GarageRow } from './GarageRow'

interface GarageYearSectionProps {
  year: number
  cars: readonly Car[]
}

export function GarageYearSection({ year, cars }: GarageYearSectionProps) {
  const { stats } = useCollection()
  const yearStats = stats.byYear.find((candidate) => candidate.year === year)

  return (
    <section aria-label={`${year} releases`}>
      <h2 className="sticky top-[57px] z-10 flex items-baseline justify-between border-b border-outline bg-asphalt/95 px-2 py-2 backdrop-blur-sm">
        <span className="text-lg font-extrabold text-on-surface">{year}</span>
        <span className="text-xs font-semibold text-on-surface-variant">
          <span className="text-neon-amber">{yearStats?.owned ?? 0}</span> / {yearStats?.total ?? 0}{' '}
          owned
          {yearStats && yearStats.mint > 0 && (
            <span className="text-streetlight"> · {yearStats.mint} mint</span>
          )}
        </span>
      </h2>
      <ul>
        {cars.map((car) => (
          <GarageRow key={car.id} car={car} />
        ))}
      </ul>
    </section>
  )
}
