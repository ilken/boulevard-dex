import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

import { NavBar } from '@/components/layout/NavBar'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <div className="min-h-dvh bg-asphalt pb-20 sm:pb-8">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 pt-6">
        <Outlet />
      </main>
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex animate-fade-up flex-col items-center gap-4 py-24 text-center">
      <p className="text-4xl font-extrabold text-neon-amber">404</p>
      <p className="text-on-surface-variant">This street doesn't exist on the boulevard.</p>
      <Link
        to="/"
        className="rounded-lg bg-neon-amber px-4 py-2 text-sm font-bold text-on-neon-amber transition-transform duration-150 active:scale-[0.97]"
      >
        Back to the dex
      </Link>
    </div>
  )
}
