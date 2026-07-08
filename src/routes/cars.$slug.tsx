import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { CarDetail } from '@/components/car/CarDetail'
import { CARS_BY_SLUG } from '@/data/cars.constants'

export const Route = createFileRoute('/cars/$slug')({
  loader: ({ params }) => {
    const car = CARS_BY_SLUG.get(params.slug)
    if (!car) throw notFound()
    return { car }
  },
  notFoundComponent: CarNotFound,
  component: CarPage,
})

function CarPage() {
  const { car } = Route.useLoaderData()

  return (
    <div>
      <Link
        to="/"
        className="text-sm font-semibold text-on-surface-variant transition-colors duration-150 hover:text-on-surface"
      >
        ← Back to the dex
      </Link>
      <div className="mt-4">
        <CarDetail car={car} />
      </div>
    </div>
  )
}

function CarNotFound() {
  return (
    <div className="flex animate-fade-up flex-col items-center gap-4 py-24 text-center">
      <p className="text-on-surface-variant">That casting isn't in the Boulevard dex.</p>
      <Link to="/" className="font-semibold text-neon-amber">
        Back to the dex
      </Link>
    </div>
  )
}
