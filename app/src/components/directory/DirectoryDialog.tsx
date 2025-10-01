import directories from 'launchhero-directories'
import { Check, SquareArrowOutUpRight } from 'lucide-react'
import { DateTime } from 'luxon'
import { useCallback, useEffect, useMemo, useState } from 'react'

import useConfetti from '~hooks/common/useConfetti'
import usePersistedState from '~hooks/common/usePersistedState'
import useThrottledEffect from '~hooks/common/useThrottledEffect'
import useProject from '~hooks/data/useProject'
import useSubmissions from '~hooks/data/useSubmissions'

import DirectoryIcon from '~components/directory/DirectoryIcon'
import DirectorySubmissionStatusChip from '~components/directory/DirectorySubmissionStatusChip'
import { Button } from '~components/ui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~components/ui/Dialog'
import { Input } from '~components/ui/Input'
import { Label } from '~components/ui/Label'

type Props = {
  directoryId: string
  setDirectoryId: (id: string) => void
}

function DirectoryDialog({ directoryId, setDirectoryId }: Props) {
  const project = useProject()!
  const { submissions, createSubmission, deleteSubmission, updateSubmission, loading } = useSubmissions()
  const directory = useMemo(() => directories.find(directory => directory.id === directoryId) ?? null, [directoryId])
  const submission = useMemo(() => submissions.find(submission => submission.directoryId === directoryId) ?? null, [directoryId, submissions])

  const fireConfetti = useConfetti()

  const [submissionUrl, setSubmissionUrl] = usePersistedState(`${project.id}-${directoryId}-submission-url`, '')
  const [initialized, setInitialized] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleMarkAsSubmitted = useCallback(() => {
    if (!submission) {
      createSubmission(directoryId, submissionUrl || null)
      fireConfetti()

      return
    }

    deleteSubmission(submission.id)
  }, [
    directoryId,
    submission,
    submissionUrl,
    createSubmission,
    deleteSubmission,
    fireConfetti,
  ])

  useEffect(() => {
    if (loading) return
    if (initialized) return

    setSubmissionUrl(submission?.url || '')
    setInitialized(true)
  }, [
    loading,
    initialized,
    submission?.url,
    submissionUrl,
    setSubmissionUrl,
  ])

  useThrottledEffect(() => {
    if (!submission) return
    if (!submissionUrl) return
    if (submission.url === submissionUrl) return

    updateSubmission(submission.id, { url: submissionUrl })
    setSaved(true)
  }, 250, [
    submission,
    submissionUrl,
    updateSubmission,
  ])

  if (!directory) return null

  return (
    <Dialog
      open={!!directoryId}
      onOpenChange={open => {
        if (open) return

        setDirectoryId('')
        setInitialized(false)
        setSaved(false)
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogClose />
          <DialogTitle>
            <DirectoryIcon directory={directory} />
            {directory.name}
            <DirectorySubmissionStatusChip directory={directory} />
          </DialogTitle>
          <DialogDescription>
            {directory.description}
          </DialogDescription>
        </DialogHeader>
        {!!submission && (
          <div>
            <div className="text-sm text-neutral-500">
              Submitted on
              {' '}
              {DateTime.fromISO(submission.createdAt).toLocaleString(DateTime.DATETIME_FULL)}
            </div>
            <Label className="mt-4">
              Submission link
            </Label>
            <div className="mt-1 text-sm text-neutral-500">
              Paste the link to your submission here to add it to your report
            </div>
            <Input
              value={submissionUrl}
              onChange={event => {
                setSubmissionUrl(event.target.value)
                setSaved(false)
              }}
              placeholder={`${directory.url}/product/${project?.id ?? 'project'}`}
              className="mt-1"
            />
            <div className="mt-1 min-h-4">
              {saved && (
                <div className="text-xs text-green-500 flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Saved!
                </div>
              )}
            </div>
          </div>
        )}
        <DialogFooter>
          <a
            href={submission?.url ?? directory.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary">
              <SquareArrowOutUpRight className="h-4 w-4" />
              Visit
              {' '}
              {submission ? 'submission' : 'website'}
            </Button>
          </a>
          {!submission && (
            <a
              href={directory.submissionUrl || directory.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">
                <SquareArrowOutUpRight className="h-4 w-4" />
                Start submission
              </Button>
            </a>
          )}
          <Button
            onClick={handleMarkAsSubmitted}
            loading={loading}
          >
            {submission ? 'Unmark as submitted' : 'Mark as submitted'}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default DirectoryDialog
