import { createFileRoute } from '@tanstack/react-router'

import { GarageYearSection } from '@/components/garage/GarageYearSection'
import { Toggle } from '@/components/ui/Toggle'
import { CARS, DEX_YEARS } from '@/data/cars.constants'
import { OWNER_CAR_IDS } from '@/data/owner.constants'
import { setOwnedBulk, useCollection } from '@/hooks/use-collection'

export const Route = createFileRoute('/garage')({
  component: GaragePage,
})

function GaragePage() {
  const { isOwned } = useCollection()
  const ownerLoaded = OWNER_CAR_IDS.every((id) => isOwned(id))

  return (
    <div className="animate-fade-up">
      <header className="flex flex-wrap items-end justify-between gap-3 py-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Garage</h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Tick what's in your garage — and what never left the box.
          </p>
        </div>
        <Toggle
          checked={ownerLoaded}
          onChange={() => setOwnedBulk(OWNER_CAR_IDS, !ownerLoaded)}
          label="Owner's Garage"
          variant="owned"
        />
      </header>
      {DEX_YEARS.map((year) => (
        <GarageYearSection key={year} year={year} cars={CARS.filter((car) => car.year === year)} />
      ))}
    </div>
  )
}
