export interface NavItem {
  to: '/' | '/garage' | '/profile'
  label: string
  /** Inline icon path (24×24 viewBox), stroked. */
  iconPath: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  {
    to: '/',
    label: 'Dex',
    iconPath: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  },
  {
    to: '/garage',
    label: 'My Garage',
    iconPath: 'M4 6h2v2H4zM9 7h11M4 11h2v2H4zM9 12h11M4 16h2v2H4zM9 17h11',
  },
  {
    to: '/profile',
    label: 'Profile',
    iconPath: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5',
  },
]
