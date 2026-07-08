import { createFileRoute } from '@tanstack/react-router'

import { GarageYearSection } from '@/components/garage/GarageYearSection'
import { CARS, DEX_YEARS } from '@/data/cars.constants'

export const Route = createFileRoute('/garage')({
  component: GaragePage,
})

function GaragePage() {
  return (
    <div className="animate-fade-up">
      <header className="py-4">
        <h1 className="text-3xl font-extrabold tracking-tight">My Garage</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Tick what's in your garage — and what never left the box.
        </p>
      </header>
      {DEX_YEARS.map((year) => (
        <GarageYearSection key={year} year={year} cars={CARS.filter((car) => car.year === year)} />
      ))}
    </div>
  )
}
