import { Link } from '@tanstack/react-router'

import { CarImage } from '@/components/car/CarImage'
import type { Car } from '@/data/dex.types'
import { formatDexNumber } from '@/lib/format'

interface CarCardProps {
  car: Car
  owned: boolean
  mint: boolean
  /** Stagger index; only the first few cards get an entrance delay. */
  index: number
}

const STAGGER_MS = 20
const STAGGER_CAP_MS = 200

export function CarCard({ car, owned, mint, index }: CarCardProps) {
  return (
    <Link
      to="/cars/$slug"
      params={{ slug: car.slug }}
      className="group block animate-fade-up overflow-hidden rounded-xl border border-outline-variant bg-surface-2 transition-[transform,box-shadow] duration-150 ease-standard hover:-translate-y-1 hover:-rotate-1 hover:scale-[1.02] hover:shadow-glow-amber"
      style={{ animationDelay: `${Math.min(index * STAGGER_MS, STAGGER_CAP_MS)}ms` }}
    >
      <div className="relative">
        <CarImage
          car={car}
          className={
            owned
              ? ''
              : 'opacity-60 grayscale transition-[filter,opacity] duration-150 group-hover:opacity-90 group-hover:grayscale-0'
          }
        />
        {/* Headlight sweep on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-transparent via-on-surface/15 to-transparent opacity-0 group-hover:animate-headlight-sweep group-hover:opacity-100"
        />
        {mint && (
          <span className="absolute top-2 right-2 rounded-sm bg-streetlight px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider text-asphalt uppercase shadow-glow-cyan">
            Mint
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-on-surface">{car.name}</p>
          <p className="text-xs text-on-surface-variant">
            {car.year} · Mix {car.mix}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {owned && <span aria-label="Owned" className="h-2 w-2 rounded-full bg-neon-amber" />}
          <span className="text-xs font-extrabold tracking-wide text-neon-amber tabular-nums">
            {formatDexNumber(car.id)}
          </span>
        </div>
      </div>
    </Link>
  )
}
