import type { Directory } from 'launchhero-core'
import { useEffect, useState } from 'react'

import extractInitials from '~utils/string/extractInitials'

type Props = {
  directory: Directory
}

type State = 'loading' | 'success' | 'error'

function DirectoryIcon({ directory }: Props) {
  const src = `/images/directories/${directory.id}.png`

  const [state, setState] = useState<State>('loading')

  useEffect(() => {
    const img = new Image()
    img.onload = () => setState('success')
    img.onerror = () => setState('error')
    img.src = src
  }, [src])

  if (state === 'loading') {
    return (
      <div className="flex h-8 rounded-xs border bg-neutral-50 " />
    )
  }

  if (state === 'error') {
    return (
      <div className="h-8 w-8 flex items-center justify-center rounded-xs border bg-neutral-50 text-sm font-medium">
        {extractInitials(directory.name)}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={directory.name}
      className="h-8 w-8 rounded-xs object-contain border"
    />
  )
}

export default DirectoryIcon
