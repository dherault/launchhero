import type { DirectoryTag } from '~types'

import { Badge } from '~components/ui/Badge'

type Props = {
  directoryTag: DirectoryTag
}

function DirectoryTagChip({ directoryTag }: Props) {
  return (
    <Badge variant="secondary">
      {directoryTag}
    </Badge>
  )
}

export default DirectoryTagChip
