import type { User as Viewer } from 'firebase/auth'
import type { UpdateData } from 'firebase/firestore'
import type { User } from 'launchhero-core'
import { createContext } from 'react'

export type UserContextType = {
  viewer: Viewer | null
  user: User | null
  loading: boolean
  updateUser: (payload: UpdateData<User>) => Promise<void>
  signOut: () => Promise<void>
}

export default createContext<UserContextType>({
  viewer: null,
  user: null,
  loading: false,
  updateUser: async () => {},
  signOut: async () => {},
})
