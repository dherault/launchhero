import type { UpdateData } from 'firebase/firestore'
import { createContext } from 'react'
import type { Project } from 'submithero-core'

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
