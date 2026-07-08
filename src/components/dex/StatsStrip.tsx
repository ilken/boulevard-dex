import { useCollection } from '@/hooks/use-collection'

import { OdometerStat } from './OdometerStat'
import { ProgressBarCar } from './ProgressBarCar'
import { YearStatsRow } from './YearStatsRow'

export function StatsStrip() {
  const { stats } = useCollection()

  return (
    <section aria-label="Collection stats" className="animate-fade-up space-y-4">
      <div className="grid grid-cols-3 gap-2 sm:max-w-md">
        <OdometerStat value={stats.owned} label={`of ${stats.total} owned`} accent="amber" />
        <OdometerStat value={stats.mint} label="mint in box" accent="cyan" />
        <OdometerStat
          value={Math.round(stats.pctOwned * 100)}
          label="complete"
          accent="pink"
          suffix="%"
        />
      </div>
      <ProgressBarCar fraction={stats.pctOwned} />
      <YearStatsRow byYear={stats.byYear} />
    </section>
  )
}
