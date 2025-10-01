import type { DirectoryRequirementType } from 'launchhero-core'
import { useCallback, useMemo, useState } from 'react'

import useProject from '~hooks/data/useProject'
import useProjects from '~hooks/data/useProjects'

function useProjectContentValue(type: DirectoryRequirementType) {
  const project = useProject()
  const { updateProject } = useProjects()

  const contentIndex = useMemo(() => project?.contents.findIndex(content => content.type === type) ?? -1, [project, type])
  const value = useMemo(() => project?.contents[contentIndex]?.value, [project, contentIndex])

  const [loading, setLoading] = useState(false)

  const setValue = useCallback(async (nextValue: string) => {
    if (!project) return

    setLoading(true)
    const nextContents = [...project.contents]

    if (contentIndex === -1) {
      nextContents.push({ type, value: nextValue })
    }
    else {
      nextContents[contentIndex].value = nextValue
    }

    await updateProject(project.id, { contents: nextContents })

    setLoading(false)
  }, [
    type,
    project,
    contentIndex,
    updateProject,
  ])

  return { value, setValue, loading }
}

export default useProjectContentValue
