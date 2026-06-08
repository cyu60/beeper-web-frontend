import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'beeper_admin'

export async function getAdminPassword(): Promise<string | null> {
  const c = await cookies()
  return c.get(ADMIN_COOKIE)?.value ?? null
}
