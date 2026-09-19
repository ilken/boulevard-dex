import { CARS_BY_ID } from './cars.constants'

/** Ilken's real-world collection — the "Owner's Garage" preset on the garage screen. */
export const OWNER_CAR_IDS: readonly number[] = [
  35, 91, 92, 93, 94, 95, 112, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138,
  139, 140, 141, 142, 143, 144, 145, 149, 151, 153, 154, 157, 158, 159, 160,
]

// Runs once at module load; a preset pointing at ghost cars should never ship.
for (const id of OWNER_CAR_IDS) {
  if (!CARS_BY_ID.has(id)) {
    throw new Error(`Owner preset: car #${id} is not in the dex`)
  }
}
