import type { Directory } from 'launchhero-core'

import extractInitials from '~utils/string/extractInitials'

type Props = {
  directory: Directory
}

function DirectoryIcon({ directory }: Props) {
  if (!directory.imageUrl) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-xs border bg-neutral-50 text-sm font-medium">
        {extractInitials(directory.name)}
      </div>
    )
  }

  return (
    <img
      src={directory.imageUrl}
      alt={directory.name}
      className="h-8 w-8 rounded-xs object-contain border"
    />
  )
}

export default DirectoryIcon
