import { useOdometer } from '@/hooks/use-odometer'

interface OdometerStatProps {
  value: number
  label: string
  accent?: 'amber' | 'cyan' | 'pink'
  suffix?: string
}

const ACCENTS: Record<NonNullable<OdometerStatProps['accent']>, string> = {
  amber: 'text-neon-amber',
  cyan: 'text-streetlight',
  pink: 'text-neon-pink',
}

export function OdometerStat({ value, label, accent = 'amber', suffix = '' }: OdometerStatProps) {
  const display = useOdometer(value)

  return (
    <div className="flex flex-col items-center rounded-xl bg-surface-1 px-4 py-3 sm:items-start">
      <span className={`text-2xl font-extrabold tabular-nums sm:text-3xl ${ACCENTS[accent]}`}>
        {display}
        {suffix}
      </span>
      <span className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
        {label}
      </span>
    </div>
  )
}
