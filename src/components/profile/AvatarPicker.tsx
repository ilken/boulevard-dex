import { useMemo } from 'react'

import { CarImage } from '@/components/car/CarImage'
import { CARS } from '@/data/cars.constants'
import { useCollection } from '@/hooks/use-collection'
import { updateProfile, useProfile } from '@/hooks/use-profile'
import { formatDexNumber } from '@/lib/format'

/** Pick one Boulevard car as your avatar — owned cars come first. */
export function AvatarPicker() {
  const profile = useProfile()
  const { isOwned } = useCollection()

  const sortedCars = useMemo(
    () => [...CARS].sort((a, b) => Number(isOwned(b.id)) - Number(isOwned(a.id)) || a.id - b.id),
    [isOwned],
  )

  return (
    <fieldset>
      <legend className="mb-2 block text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
        Avatar — pick your ride
      </legend>
      <ul className="grid max-h-80 grid-cols-4 gap-2 overflow-y-auto rounded-xl border border-outline-variant bg-surface-1 p-2 sm:grid-cols-6 md:grid-cols-8">
        {sortedCars.map((car) => {
          const selected = profile.avatarCarId === car.id
          return (
            <li key={car.id}>
              <button
                type="button"
                onClick={() => updateProfile({ avatarCarId: selected ? null : car.id })}
                aria-pressed={selected}
                aria-label={`${car.name} ${formatDexNumber(car.id)}`}
                title={car.name}
                className={`block w-full overflow-hidden rounded-lg border-2 transition-[border-color,box-shadow] duration-150 ${
                  selected
                    ? 'border-neon-amber shadow-glow-amber'
                    : 'border-transparent hover:border-outline'
                }`}
              >
                <CarImage car={car} className={isOwned(car.id) ? '' : 'opacity-50 grayscale'} />
              </button>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}
