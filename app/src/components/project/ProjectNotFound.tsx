import type { PropsWithChildren } from 'react'

import useProject from '~hooks/data/useProject'

import NotFound from '~components/common/NotFound'

function ProjectNotFound({ children }: PropsWithChildren) {
  const project = useProject()

  if (!project) {
    return (
      <NotFound source="ProjectNotFound" />
    )
  }

  return children
}

export default ProjectNotFound
