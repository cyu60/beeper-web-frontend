'use client'
import { useIdentity } from '@/lib/identity'
import { LandingPage } from '@/components/landing/landing-page'

export function IdentityGate({ children }: { children: React.ReactNode }) {
  const [me, , loaded] = useIdentity()

  if (!loaded) return null
  if (me) return <>{children}</>

  return <LandingPage />
}
