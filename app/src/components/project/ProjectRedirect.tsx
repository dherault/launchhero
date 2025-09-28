import { Navigate } from 'react-router'

import useProjects from '~hooks/data/useProjects'

function ProjectRedirect() {
  const { projects } = useProjects()

  if (!projects.length) {
    return (
      <Navigate
        replace
        to="/-/onboarding"
      />
    )
  }

  return (
    <Navigate
      replace
      to={`/-/projects/${projects.at(-1)!.id}`}
    />
  )
}

export default ProjectRedirect
