import { Navigate } from 'react-router'

import useProjects from '~hooks/data/useProjects'

function RootRedirect() {
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
      to={`/-/project/${projects.at(-1)!.id}`}
    />
  )
}

export default RootRedirect
