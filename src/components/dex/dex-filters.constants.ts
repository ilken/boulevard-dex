import type { StatusFilter } from '@/hooks/use-dex-filters'

export const STATUS_FILTERS: readonly { value: StatusFilter; label: string }[] = [
  { value: 'owned', label: 'Owned' },
  { value: 'missing', label: 'Missing' },
  { value: 'mint', label: 'Mint' },
]

export const SEARCH_PLACEHOLDER = 'Search name, make, or #number'
