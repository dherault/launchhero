import { Navigate } from 'react-router'

function ProjectRedirect() {
  return (
    <Navigate
      replace
      to="directories"
    />
  )
}

export default ProjectRedirect
