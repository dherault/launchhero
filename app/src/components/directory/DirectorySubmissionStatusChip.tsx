import type { Directory } from 'launchhero-core'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

import useSubmissions from '~hooks/data/useSubmissions'

import Spinner from '~components/common/Spinner'
import { Badge } from '~components/ui/Badge'

type Props = {
  directory: Directory
}

function DirectorySubmissionStatusChip({ directory }: Props) {
  const { submissions, loading } = useSubmissions()
  const submission = useMemo(() => submissions.find(s => s.directoryId === directory.id) ?? null, [submissions, directory.id])

  if (loading) {
    return (
      <Spinner className="w-4" />
    )
  }

  return (
    <Badge variant={submission ? 'default' : 'secondary'}>
      {submission ? `Submitted ${DateTime.fromISO(submission.createdAt).toLocaleString(DateTime.DATE_SHORT)}` : 'Not submitted'}
    </Badge>
  )
}

export default DirectorySubmissionStatusChip
