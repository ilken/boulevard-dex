export interface CollectionEntry {
  owned: boolean
  /** Still in box. Invariant enforced in use-collection: mint ⇒ owned. */
  mint: boolean
  updatedAt: string
}

/** Per-car record objects (not sets) so trading fields (forTrade, wishlist…) slot in at v2. */
export interface CollectionStore {
  version: 1
  cars: Record<string, CollectionEntry>
}

export interface ProfileStore {
  version: 1
  nickname: string
  avatarCarId: number | null
  city: string
  country: string
}
