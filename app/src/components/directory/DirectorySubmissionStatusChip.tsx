import { useMemo } from 'react'

import useSubmissions from '~hooks/data/useSubmissions'

import ThreeDots from '~components/common/ThreeDots'
import { Badge } from '~components/ui/Badge'

type Props = {
  directoryId: string
}

function DirectorySubmissionStatusChip({ directoryId }: Props) {
  const { submissions, loading } = useSubmissions()
  const submission = useMemo(() => submissions.find(s => s.directoryId === directoryId) ?? null, [submissions, directoryId])

  if (loading) {
    return (
      <Badge variant="secondary">
        <ThreeDots />
      </Badge>
    )
  }

  return (
    <Badge variant={submission ? 'default' : 'secondary'}>
      {submission ? 'Submitted' : 'Not submitted'}
    </Badge>
  )
}

export default DirectorySubmissionStatusChip
