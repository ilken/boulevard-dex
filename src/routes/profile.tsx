import { createFileRoute } from '@tanstack/react-router'

import { AvatarPicker } from '@/components/profile/AvatarPicker'
import { ProfileCard } from '@/components/profile/ProfileCard'
import { ProfileForm } from '@/components/profile/ProfileForm'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl animate-fade-up space-y-6">
      <header className="py-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Your collector card for the trading days ahead.
        </p>
      </header>
      <ProfileCard />
      <ProfileForm />
      <AvatarPicker />
    </div>
  )
}
