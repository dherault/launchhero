import type { DirectoryRequirementType } from 'launchhero-core'

import labels, { descriptions } from '~components/content/constants'
import { Label } from '~components/ui/Label'

type Props = {
  type: DirectoryRequirementType
}

function ContentLabel({ type }: Props) {
  const label = labels[type] ?? type
  const description = descriptions[type] ?? ''

  return (
    <div>
      <Label>
        {label}
      </Label>
      <div className="mt-1.5 text-sm text-neutral-500">
        {description}
      </div>
    </div>
  )
}

export default ContentLabel
