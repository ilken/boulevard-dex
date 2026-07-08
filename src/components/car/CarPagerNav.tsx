import { Link } from '@tanstack/react-router'

import { CARS_BY_ID } from '@/data/cars.constants'
import { formatDexNumber } from '@/lib/format'

interface CarPagerNavProps {
  currentId: number
}

export function CarPagerNav({ currentId }: CarPagerNavProps) {
  const previous = CARS_BY_ID.get(currentId - 1)
  const next = CARS_BY_ID.get(currentId + 1)

  const linkClass =
    'flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-1 px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors duration-150 hover:border-outline hover:text-on-surface'

  return (
    <nav aria-label="Dex navigation" className="mt-6 flex justify-between gap-2">
      {previous ? (
        <Link to="/cars/$slug" params={{ slug: previous.slug }} className={linkClass}>
          ← {formatDexNumber(previous.id)}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to="/cars/$slug" params={{ slug: next.slug }} className={linkClass}>
          {formatDexNumber(next.id)} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
