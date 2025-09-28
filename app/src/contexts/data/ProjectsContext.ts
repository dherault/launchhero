import type { UpdateData } from 'firebase/firestore'
import type { Project } from 'launchhero-core'
import { createContext } from 'react'

export type ProjectsContextType = {
  projects: Project[]
  loading: boolean
  createProject: (name: string) => Promise<Project | undefined>
  updateProject: (projectId: string, payload: UpdateData<Project>) => Promise<void>
  deleteProject: (projectId: string) => Promise<void>
}

export default createContext<ProjectsContextType>({
  projects: [],
  loading: false,
  createProject: async () => ({} as Project),
  updateProject: async () => {},
  deleteProject: async () => {},
})
