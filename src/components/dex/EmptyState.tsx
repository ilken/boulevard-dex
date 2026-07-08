import { CarSilhouette } from '@/components/car/CarSilhouette'

export function EmptyState() {
  return (
    <div className="flex animate-fade-in flex-col items-center gap-4 py-16 text-center">
      <CarSilhouette bodyType="classic" dexId={0} className="w-40 rounded-xl opacity-60" />
      <p className="text-sm text-on-surface-variant">No cars match. Loosen the filters.</p>
    </div>
  )
}
