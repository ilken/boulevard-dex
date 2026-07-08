import { CarImage } from '@/components/car/CarImage'
import { CARS_BY_ID } from '@/data/cars.constants'
import { useCollection } from '@/hooks/use-collection'
import { useProfile } from '@/hooks/use-profile'

/** Live preview of the profile as other traders will one day see it. */
export function ProfileCard() {
  const profile = useProfile()
  const { stats } = useCollection()
  const avatarCar = profile.avatarCarId ? CARS_BY_ID.get(profile.avatarCarId) : undefined

  return (
    <div className="flex items-center gap-4 rounded-xl border border-outline-variant bg-surface-1 p-4">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-neon-amber shadow-glow-amber">
        {avatarCar ? (
          <CarImage car={avatarCar} className="h-full w-full" />
        ) : (
          <div aria-hidden className="h-full w-full bg-surface-3" />
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-lg font-extrabold text-on-surface">
          {profile.nickname || 'Unnamed collector'}
        </p>
        <p className="truncate text-sm text-on-surface-variant">
          {[profile.city, profile.country].filter(Boolean).join(', ') ||
            'Somewhere on the boulevard'}
        </p>
        <p className="mt-0.5 text-xs font-semibold text-neon-amber">
          {stats.owned} of {stats.total} collected
          {stats.mint > 0 && <span className="text-streetlight"> · {stats.mint} mint</span>}
        </p>
      </div>
    </div>
  )
}
