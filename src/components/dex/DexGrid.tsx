import type { Car } from '@/data/dex.types'
import { useCollection } from '@/hooks/use-collection'

import { CarCard } from './CarCard'
import { EmptyState } from './EmptyState'

interface DexGridProps {
  cars: readonly Car[]
}

export function DexGrid({ cars }: DexGridProps) {
  const { isOwned, isMint } = useCollection()

  if (cars.length === 0) return <EmptyState />

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {cars.map((car, index) => (
        <li key={car.id}>
          <CarCard car={car} owned={isOwned(car.id)} mint={isMint(car.id)} index={index} />
        </li>
      ))}
    </ul>
  )
}
