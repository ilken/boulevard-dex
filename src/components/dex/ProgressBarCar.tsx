import { formatPercent } from '@/lib/format'

interface ProgressBarCarProps {
  fraction: number
}

/** The collection progress bar — a car drives along a night road as you collect. */
export function ProgressBarCar({ fraction }: ProgressBarCarProps) {
  const pct = Math.max(0, Math.min(1, fraction))

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct * 100)}
      aria-label="Collection progress"
      className="relative"
    >
      <div className="relative h-3 overflow-hidden rounded-full bg-surface-1">
        {/* Lane divider */}
        <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-outline" />
        <div
          className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-linear-to-r from-neon-amber/60 to-neon-amber transition-transform duration-450 ease-expressive"
          style={{ transform: `scaleX(${pct})` }}
        />
      </div>
      {/* Full-width lane shifted by pct: the car rides the leading edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 transition-transform duration-450 ease-expressive"
        style={{ transform: `translateX(${pct * 100}%)` }}
      >
        <svg
          viewBox="0 0 32 20"
          className="h-5 w-8 -translate-x-1/2 -translate-y-1/2 animate-wheel-bob"
        >
          <path
            d="M2 13h2l3-5c.4-.6 1-1 1.8-1h8.4c.7 0 1.3.3 1.7.8L22 11h6c1 0 2 .8 2 1.8V14c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1v-.5c0-.3.2-.5.5-.5z"
            className="fill-neon-amber"
          />
          <circle
            cx="9"
            cy="15"
            r="2.6"
            className="fill-asphalt stroke-streetlight"
            strokeWidth="1.2"
          />
          <circle
            cx="24"
            cy="15"
            r="2.6"
            className="fill-asphalt stroke-streetlight"
            strokeWidth="1.2"
          />
        </svg>
      </div>
      <p className="mt-2 text-right text-xs font-semibold text-on-surface-variant">
        {formatPercent(pct)} of the boulevard collected
      </p>
    </div>
  )
}
