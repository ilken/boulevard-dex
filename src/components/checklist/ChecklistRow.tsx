import { Link } from '@tanstack/react-router'

import { CarImage } from '@/components/car/CarImage'
import { Toggle } from '@/components/ui/Toggle'
import type { Car } from '@/data/dex.types'
import { toggleMint, toggleOwned, useCollection } from '@/hooks/use-collection'
import { formatDexNumber } from '@/lib/format'

interface ChecklistRowProps {
  car: Car
}

export function ChecklistRow({ car }: ChecklistRowProps) {
  const { isOwned, isMint } = useCollection()

  return (
    <li
      className="flex items-center gap-3 border-b border-outline-variant px-2 py-2.5"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 64px' }}
    >
      <span className="w-11 shrink-0 text-xs font-extrabold text-neon-amber tabular-nums">
        {formatDexNumber(car.id)}
      </span>
      <Link
        to="/cars/$slug"
        params={{ slug: car.slug }}
        className="flex min-w-0 flex-1 items-center gap-3"
      >
        <CarImage car={car} className="w-14 shrink-0 rounded-lg" />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-on-surface">{car.name}</span>
          <span className="block text-xs text-on-surface-variant">Mix {car.mix}</span>
        </span>
      </Link>
      <div className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-4">
        <Toggle
          checked={isOwned(car.id)}
          onChange={() => toggleOwned(car.id)}
          label="Owned"
          variant="owned"
        />
        <Toggle
          checked={isMint(car.id)}
          onChange={() => toggleMint(car.id)}
          label="Mint"
          variant="mint"
        />
      </div>
    </li>
  )
}
