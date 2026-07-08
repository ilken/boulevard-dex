import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia(QUERY)
  mediaQuery.addEventListener('change', onChange)
  return () => mediaQuery.removeEventListener('change', onChange)
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches
}

/** Gates JS-driven motion (odometer, tilt); CSS motion is killed globally in index.css. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot)
}
