import { CarImage } from '@/components/car/CarImage'
import { Toggle } from '@/components/ui/Toggle'
import type { Car } from '@/data/dex.types'
import { toggleMint, toggleOwned, useCollection } from '@/hooks/use-collection'
import { formatDexNumber } from '@/lib/format'

import { CarPagerNav } from './CarPagerNav'

interface CarDetailProps {
  car: Car
}

const BODY_TYPE_LABELS: Record<Car['bodyType'], string> = {
  muscle: 'Muscle',
  jdm: 'JDM',
  'van-bus': 'Van / Bus',
  'off-road': 'Off-road',
  supercar: 'Supercar',
  classic: 'Classic',
}

export function CarDetail({ car }: CarDetailProps) {
  const { isOwned, isMint } = useCollection()

  return (
    <article className="mx-auto max-w-2xl">
      <div className="relative animate-hero-arrive overflow-hidden rounded-xl border border-outline-variant shadow-card">
        <CarImage car={car} className="w-full" />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-headlight-sweep bg-linear-to-r from-transparent via-on-surface/20 to-transparent"
        />
      </div>

      <header className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p
            className="text-2xl font-extrabold text-neon-amber tabular-nums"
            style={{ textShadow: 'var(--shadow-glow-amber)' }}
          >
            {formatDexNumber(car.id)}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">{car.name}</h1>
        </div>
      </header>

      <dl className="mt-4 grid grid-cols-3 gap-2">
        {[
          ['Year', String(car.year)],
          ['Mix', car.mix],
          ['Body', BODY_TYPE_LABELS[car.bodyType]],
        ].map(([label, value], index) => (
          <div
            key={label}
            className="animate-fade-up rounded-xl bg-surface-1 px-3 py-2.5"
            style={{ animationDelay: `${index * 20}ms` }}
          >
            <dt className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
              {label}
            </dt>
            <dd className="text-sm font-bold text-on-surface">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex items-center gap-6 rounded-xl border border-outline-variant bg-surface-1 px-4 py-3">
        <Toggle
          checked={isOwned(car.id)}
          onChange={() => toggleOwned(car.id)}
          label="Owned"
          variant="owned"
        />
        <Toggle
          checked={isMint(car.id)}
          onChange={() => toggleMint(car.id)}
          label="Mint in box"
          variant="mint"
        />
      </div>

      <CarPagerNav currentId={car.id} />
    </article>
  )
}
