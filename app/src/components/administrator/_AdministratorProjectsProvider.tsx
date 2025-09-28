import { collection, orderBy, query } from 'firebase/firestore'
import { type PropsWithChildren, useMemo } from 'react'
import type { Project } from 'submithero-core'

import { database } from '~firebase'

import ProjectsContext from '~contexts/data/ProjectsContext'
import { ProjectsContextType } from '~contexts/data/ProjectsContext'

import useLiveDocuments from '~hooks/db/useLiveDocuments'

import ErrorOccured from '~components/common/ErrorOccured'
import Loading from '~components/common/Loading'

function AdministratorProjectsProvider({ children }: PropsWithChildren) {
  const q = useMemo(() => query(
    collection(database, 'projects'),
    orderBy('createdAt', 'desc'),
  ), [])

  const { data: projects, loading, error } = useLiveDocuments<Project>(q)

  const projectsContextValue = useMemo<ProjectsContextType>(() => ({
    projects,
    loading,
    createProject: async () => undefined,
    updateProject: async () => {},
    deleteProject: async () => {},
  }), [
    projects,
    loading,
  ])

  if (error) {
    return (
      <ErrorOccured
        source="AdministratorProjectsProvider"
        message={error.message}
      />
    )
  }

  if (loading) {
    return (
      <Loading source="AdministratorProjectsProvider" />
    )
  }

  return (
    <ProjectsContext.Provider value={projectsContextValue}>
      {children}
    </ProjectsContext.Provider>
  )
}

export default AdministratorProjectsProvider
