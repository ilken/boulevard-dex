import { updateProfile, useProfile } from '@/hooks/use-profile'

import { PROFILE_FIELDS } from './form.constants'

export function ProfileForm() {
  const profile = useProfile()

  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      {PROFILE_FIELDS.map((field) => (
        <label key={field.key} className="block">
          <span className="mb-1 block text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
            {field.label}
          </span>
          <input
            type="text"
            value={profile[field.key]}
            maxLength={field.maxLength}
            placeholder={field.placeholder}
            onChange={(event) => updateProfile({ [field.key]: event.target.value })}
            className="w-full rounded-lg border border-outline-variant bg-surface-1 px-4 py-2.5 text-sm text-on-surface placeholder:text-muted focus:border-neon-amber sm:max-w-sm"
          />
        </label>
      ))}
      <p className="text-xs text-on-surface-variant">
        Saved on this device automatically. Trading is coming — your garage will be ready.
      </p>
    </form>
  )
}
