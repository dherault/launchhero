import type { Project, User } from 'launchhero-core'

const now = new Date().toISOString()

export const previewUser: User = {
  id: 'dherault',
  email: 'david@launchhe.ro',
  name: 'David Hérault',
  imageUrl: 'https://avatars.githubusercontent.com/u/4154003?v=4',
  hasSentVerificationEmail: false,
  hasSentWelcomeEmail: false,
  hasVerifiedEmail: false,
  signInProviders: [],
  timeZone: 'Europe/Helsinki',
  isAdministrator: false,
  userId: null,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
}

export const previewProject: Project = {
  id: 'netflix',
  name: 'Netflix',
  imageUrl: 'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456',
  isPublic: false,
  stripeId: null,
  stripeLink: null,
  selectedDirectoryIds: [],
  administratorUserIds: [previewUser.id],
  memberUserIds: [previewUser.id],
  userId: previewUser.id,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
}
