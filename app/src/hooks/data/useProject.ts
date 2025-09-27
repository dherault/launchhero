import { useContext } from 'react'

import ProjectContext from '~contexts/data/ProjectContext'

function useProject() {
  return useContext(ProjectContext)
}

export default useProject
