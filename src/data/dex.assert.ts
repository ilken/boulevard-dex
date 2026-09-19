import type { Car, DexYear } from './dex.types'

const EXPECTED_TOTAL = 165

/** Per-year totals from the source checklist; guards transcription slips. */
const EXPECTED_BY_YEAR: Readonly<Record<DexYear, number>> = {
  2020: 20,
  2021: 20,
  2022: 25,
  2023: 25,
  2024: 25,
  2025: 25,
  2026: 25,
}

/** Runs once at module load; a broken dataset should never render. */
export function assertDexIntegrity(cars: readonly Car[]): void {
  if (cars.length !== EXPECTED_TOTAL) {
    throw new Error(`Dex integrity: expected ${EXPECTED_TOTAL} cars, got ${cars.length}`)
  }

  cars.forEach((car, index) => {
    if (car.id !== index + 1) {
      throw new Error(`Dex integrity: expected id ${index + 1} at position ${index}, got ${car.id}`)
    }
  })

  const slugs = new Set(cars.map((car) => car.slug))
  if (slugs.size !== cars.length) {
    throw new Error('Dex integrity: duplicate slugs found')
  }

  for (const [year, expected] of Object.entries(EXPECTED_BY_YEAR)) {
    const actual = cars.filter((car) => car.year === Number(year)).length
    if (actual !== expected) {
      throw new Error(`Dex integrity: expected ${expected} cars in ${year}, got ${actual}`)
    }
  }
}
