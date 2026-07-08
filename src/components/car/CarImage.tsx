import { useState } from 'react'

import type { Car } from '@/data/dex.types'

import { CarSilhouette } from './CarSilhouette'

interface CarImageProps {
  car: Car
  className?: string
}

/**
 * The single image component for the whole app (grid, checklist, detail, avatar).
 * Photos live in public/cars/{id}.jpg; missing ones degrade to the branded silhouette.
 */
export function CarImage({ car, className }: CarImageProps) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed) {
    return (
      <div className={`aspect-4/3 overflow-hidden ${className ?? ''}`}>
        <CarSilhouette bodyType={car.bodyType} dexId={car.id} className="h-full w-full" />
      </div>
    )
  }

  return (
    <div className={`relative aspect-4/3 overflow-hidden bg-surface-2 ${className ?? ''}`}>
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 animate-shimmer bg-linear-to-r from-surface-2 via-surface-3 to-surface-2 bg-[length:200%_100%]"
        />
      )}
      <img
        src={`${import.meta.env.BASE_URL}cars/${car.id}.jpg`}
        alt={car.name}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
