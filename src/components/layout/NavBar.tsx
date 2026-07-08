import { Link } from '@tanstack/react-router'

import { NAV_ITEMS } from './nav.constants'
import { Wordmark } from './Wordmark'

/** Sticky top bar on desktop; fixed bottom tab bar on mobile. */
export function NavBar() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-outline-variant bg-asphalt/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" aria-label="Boulevard Dex home">
            <Wordmark />
          </Link>
          <nav className="hidden gap-1 sm:flex" aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors duration-150 hover:text-on-surface"
                activeProps={{
                  className: 'text-neon-amber shadow-glow-amber bg-surface-1',
                }}
                activeOptions={{ exact: item.to === '/' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-outline-variant bg-asphalt/95 backdrop-blur-sm sm:hidden"
        aria-label="Main"
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-semibold text-on-surface-variant"
            activeProps={{ className: 'text-neon-amber' }}
            activeOptions={{ exact: item.to === '/' }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
              <path d={item.iconPath} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
