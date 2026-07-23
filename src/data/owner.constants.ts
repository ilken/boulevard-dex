import { CARS_BY_ID } from './cars.constants'

/** Ilken's real-world collection — the "Owner's Garage" preset on the garage screen. */
export const OWNER_CAR_IDS: readonly number[] = [
  112, 125, 131, 132, 133, 134, 135, 138, 141, 142, 143, 144, 145, 149, 151, 153, 154,
]

// Runs once at module load; a preset pointing at ghost cars should never ship.
for (const id of OWNER_CAR_IDS) {
  if (!CARS_BY_ID.has(id)) {
    throw new Error(`Owner preset: car #${id} is not in the dex`)
  }
}
