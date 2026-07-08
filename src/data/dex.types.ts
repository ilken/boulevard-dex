export type DexYear = 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026

export type Mix = 'A' | 'B' | 'C' | 'D' | 'E'

/** Drives the silhouette fallback art — misclassification is cosmetic only. */
export type BodyType = 'muscle' | 'jdm' | 'van-bus' | 'off-road' | 'supercar' | 'classic'

export interface Car {
  /** Dex number, 1–150, continuous across years — Boulevard's signature. */
  id: number
  /** Unique URL slug; the padded id suffix disambiguates repeated castings. */
  slug: string
  name: string
  year: DexYear
  mix: Mix
  bodyType: BodyType
  make?: string
}

/** Raw dataset entry; slug is derived at module load to avoid transcription errors. */
export type CarSeed = Omit<Car, 'slug'>
