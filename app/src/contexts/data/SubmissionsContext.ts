import type { UpdateData } from 'firebase/firestore'
import type { Submission } from 'launchhero-core'
import { createContext } from 'react'

export type SubmissionsContextType = {
  submissions: Submission[]
  loading: boolean
  createSubmission: (directoryId: string, url: string | null) => Promise<Submission | undefined>
  updateSubmission: (submissionId: string, payload: UpdateData<Submission>) => Promise<void>
  deleteSubmission: (submissionId: string) => Promise<void>
}

export default createContext<SubmissionsContextType>({
  submissions: [],
  loading: false,
  createSubmission: async () => undefined,
  updateSubmission: async () => {},
  deleteSubmission: async () => {},
})
