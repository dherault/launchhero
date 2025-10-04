import { useMemo } from 'react'

import useSubmissions from '~hooks/data/useSubmissions'

function useSubmission(directoryId: string) {
  const { submissions } = useSubmissions()

  return useMemo(() => submissions.find(submission => submission.directoryId === directoryId) ?? null, [directoryId, submissions])
}

export default useSubmission
