import type { BodyType } from '@/data/dex.types'
import { formatDexNumber } from '@/lib/format'

import { SILHOUETTES } from './silhouettes.constants'

interface CarSilhouetteProps {
  bodyType: BodyType
  dexId: number
  className?: string
}

/** Branded fallback when a car has no photo — never a broken-image box. */
export function CarSilhouette({ bodyType, dexId, className }: CarSilhouetteProps) {
  const spec = SILHOUETTES[bodyType]

  return (
    <svg
      viewBox="0 0 160 120"
      role="img"
      aria-label={`Silhouette of car ${formatDexNumber(dexId)}`}
      className={className}
    >
      <rect width="160" height="120" className="fill-surface-2" />
      <text
        x="152"
        y="112"
        textAnchor="end"
        className="fill-surface-4 font-sans text-[18px] font-extrabold"
      >
        {formatDexNumber(dexId)}
      </text>
      <path d={spec.body} className="fill-surface-4 stroke-outline" strokeWidth="1.5" />
      {spec.wheelXs.map((x) => (
        <g key={x}>
          <circle
            cx={x}
            cy={spec.wheelY}
            r={spec.wheelR}
            className="fill-asphalt stroke-outline"
            strokeWidth="2"
          />
          <circle cx={x} cy={spec.wheelY} r={spec.wheelR * 0.45} className="fill-surface-3" />
        </g>
      ))}
      <circle cx={spec.lightX} cy={spec.lightY} r="2.5" className="fill-neon-amber" />
      <line
        x1="8"
        y1="106"
        x2="152"
        y2="106"
        className="stroke-neon-amber/40"
        strokeWidth="1.5"
        strokeDasharray="10 8"
      />
    </svg>
  )
}
