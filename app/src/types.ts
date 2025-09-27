/* ---
  DATABASE RESOURCES
--- */

type DatabaseResource<T = unknown> = T & {
  id: string
  userId: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type User = DatabaseResource<{
  email: string
  name: string | null
  imageUrl: string | null
  signInProviders: SignInProvider[]
  timeZone: string
  hasVerifiedEmail: boolean
  hasSentVerificationEmail: boolean
  hasSentWelcomeEmail: boolean
  isAdministrator: boolean
}>

export type SignInProvider = 'password' | 'google.com'

export type Project = DatabaseResource<{
  name: string
  administratorUserIds: string[]
  memberUserIds: string[]
}>
