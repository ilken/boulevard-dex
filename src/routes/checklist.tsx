import { createFileRoute } from '@tanstack/react-router'

import { ChecklistYearSection } from '@/components/checklist/ChecklistYearSection'
import { CARS, DEX_YEARS } from '@/data/cars.constants'

export const Route = createFileRoute('/checklist')({
  component: ChecklistPage,
})

function ChecklistPage() {
  return (
    <div className="animate-fade-up">
      <header className="py-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Checklist</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Tick what's in your garage — and what never left the box.
        </p>
      </header>
      {DEX_YEARS.map((year) => (
        <ChecklistYearSection
          key={year}
          year={year}
          cars={CARS.filter((car) => car.year === year)}
        />
      ))}
    </div>
  )
}
