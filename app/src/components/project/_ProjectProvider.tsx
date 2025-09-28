import { useMemo, type PropsWithChildren } from 'react'
import { useParams } from 'react-router'

import ProjectContext from '~contexts/data/ProjectContext'

import useProjects from '~hooks/data/useProjects'

import NotFound from '~components/common/NotFound'

function ProjectProvider({ children }: PropsWithChildren) {
  const { projectId } = useParams()
  const { projects } = useProjects()

  const project = useMemo(() => projects.find(project => project.id === projectId) ?? null, [projects, projectId])

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
