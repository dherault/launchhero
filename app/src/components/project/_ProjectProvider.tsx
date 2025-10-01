import { useMemo, type PropsWithChildren } from 'react'
import { useMatch } from 'react-router'

import ProjectContext from '~contexts/data/ProjectContext'

import useProjects from '~hooks/data/useProjects'

function ProjectProvider({ children }: PropsWithChildren) {
  const { projects } = useProjects()
  const projectId = useMatch('/-/projects/:projectId/*')?.params?.projectId

  const project = useMemo(() => projects.find(project => project.id === projectId) ?? null, [projects, projectId])

  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider
