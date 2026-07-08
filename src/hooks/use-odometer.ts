import { useEffect, useRef, useState } from 'react'

import { useReducedMotion } from './use-reduced-motion'

const DURATION_MS = 450

/** Brand-moment count-up toward `target`. Reduced motion renders the target directly. */
export function useOdometer(target: number): number {
  const reducedMotion = useReducedMotion()
  // Starts at 0 so the first paint counts up — the odometer IS the brand moment.
  const [display, setDisplay] = useState(0)
  const fromRef = useRef(0)

  useEffect(() => {
    const from = fromRef.current
    fromRef.current = target
    if (from === target || reducedMotion) return

    const start = performance.now()
    let frame = requestAnimationFrame(function tick(now: number) {
      const progress = Math.min((now - start) / DURATION_MS, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + (target - from) * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [target, reducedMotion])

  return reducedMotion ? target : display
}
