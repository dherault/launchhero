import type { DirectoryRequirementType } from 'launchhero-core'

type Props = {
  type: DirectoryRequirementType
}

function ContentRequirements({ type }: Props) {
  return null

  return (
    <div>
      ContentRequirements
      {type}
    </div>
  )
}

export default ContentRequirements
