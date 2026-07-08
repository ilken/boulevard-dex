interface ToggleProps {
  checked: boolean
  onChange: () => void
  label: string
  variant: 'owned' | 'mint'
}

const VARIANT_ON: Record<ToggleProps['variant'], string> = {
  owned: 'bg-neon-amber shadow-glow-amber',
  mint: 'bg-streetlight shadow-glow-cyan',
}

/** Accessible switch used by the checklist, grid, and detail screens. */
export function Toggle({ checked, onChange, label, variant }: ToggleProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <span className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full border border-outline-variant transition-colors duration-150 active:scale-[0.97] ${
          checked ? VARIANT_ON[variant] : 'bg-surface-3'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-[18px] w-[18px] rounded-full bg-on-surface transition-transform duration-150 ease-standard ${
            checked ? 'translate-x-5 bg-asphalt' : ''
          }`}
        />
      </button>
    </label>
  )
}
