export const NICKNAME_MAX_LENGTH = 24
export const CITY_MAX_LENGTH = 48
export const COUNTRY_MAX_LENGTH = 48

export const PROFILE_FIELDS = [
  {
    key: 'nickname',
    label: 'Nickname',
    placeholder: 'BoulevardHunter',
    maxLength: NICKNAME_MAX_LENGTH,
  },
  { key: 'city', label: 'City or town', placeholder: 'Brighton', maxLength: CITY_MAX_LENGTH },
  {
    key: 'country',
    label: 'Country',
    placeholder: 'United Kingdom',
    maxLength: COUNTRY_MAX_LENGTH,
  },
] as const
