import { type JSX, type PropsWithChildren } from 'react'

import useProjects from '~hooks/data/useProjects'

import Loading from '~components/common/Loading'

function ProjectsWait({ children }: PropsWithChildren) {
  const { loading } = useProjects()

  if (loading) {
    return (
      <Loading source="ProjectsWait" />
    )
  }

  return children as JSX.Element
}

export default ProjectsWait
