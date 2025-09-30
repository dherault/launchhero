import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router'

import usePersistedState from '~hooks/common/usePersistedState'
import useProjects from '~hooks/data/useProjects'

function usePreviousProject() {
  const { projectId } = useParams()
  const { projects } = useProjects()
  const [previousProjectId, setPreviousProjectId] = usePersistedState<string | null>('previousProjectId', null)

  useEffect(() => {
    if (!projectId) return

    setPreviousProjectId(projectId)
  }, [
    projectId,
    setPreviousProjectId,
  ])

  return useMemo(() =>
    projects.find(project => project.id === projectId)
    ?? projects.find(project => project.id === previousProjectId)
    ?? null,
  [
    projects,
    projectId,
    previousProjectId,
  ])
}

export default usePreviousProject
