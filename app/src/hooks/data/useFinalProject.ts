import usePreviousProject from '~hooks/data/usePreviousProject'
import useProject from '~hooks/data/useProject'

function useFinalProject() {
  const project = useProject()
  const previousProject = usePreviousProject()

  return project ?? previousProject ?? null
}

export default useFinalProject
