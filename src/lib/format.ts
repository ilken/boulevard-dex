export function formatDexNumber(id: number): string {
  return `#${String(id).padStart(3, '0')}`
}

export function formatPercent(fraction: number): string {
  return `${Math.round(fraction * 100)}%`
}

export function kebab(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
