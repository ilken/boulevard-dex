import { useSyncExternalStore } from 'react'

import { createLocalStore } from '@/lib/storage'
import { EMPTY_PROFILE, PROFILE_KEY } from '@/lib/storage.constants'
import type { ProfileStore } from '@/lib/storage.types'

const store = createLocalStore(PROFILE_KEY, EMPTY_PROFILE)

export type ProfileFields = Omit<ProfileStore, 'version'>

export function updateProfile(partial: Partial<ProfileFields>): void {
  store.update((previous) => ({ ...previous, ...partial }))
}

export function useProfile(): ProfileStore {
  return useSyncExternalStore(store.subscribe, store.getSnapshot)
}
