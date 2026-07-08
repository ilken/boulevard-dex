import type { CollectionStore, ProfileStore } from './storage.types'

export const COLLECTION_KEY = 'boulevard-dex/collection'
export const PROFILE_KEY = 'boulevard-dex/profile'

export const EMPTY_COLLECTION: CollectionStore = { version: 1, cars: {} }

export const EMPTY_PROFILE: ProfileStore = {
  version: 1,
  nickname: '',
  avatarCarId: null,
  city: '',
  country: '',
}
