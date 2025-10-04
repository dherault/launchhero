import directories from 'launchhero-directories'
import { useMemo } from 'react'

function useDirectory(directoryId: string) {
  return useMemo(() => directories.find(directory => directory.id === directoryId) ?? null, [directoryId])
}

export default useDirectory
