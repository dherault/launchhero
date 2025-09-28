import { useEffect, useMemo, type PropsWithChildren } from 'react'
import { useMatch } from 'react-router'

import ProjectContext from '~contexts/data/ProjectContext'

import usePersistedState from '~hooks/common/usePersistedState'
import useProjects from '~hooks/data/useProjects'

import NotFound from '~components/common/NotFound'

function ProjectProvider({ children }: PropsWithChildren) {
  const { projects } = useProjects()
  const projectId = useMatch('/-/projects/:projectId/*')?.params?.projectId

  const [previousProjectId, setPreviousProjectId] = usePersistedState('ProjectProvider-previousProjectId', projectId)
  const project = useMemo(() => projects.find(project => project.id === projectId) ?? null, [projects, projectId])

  useEffect(() => {
    if (!projectId) return
    if (projectId === previousProjectId) return

    setPreviousProjectId(projectId)
  }, [
    projectId,
    previousProjectId,
    setPreviousProjectId,
  ])

  if (!project) {
    return (
      <NotFound source="ProjectProvider" />
    )
  }

  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider
