import directories from 'launchhero-directories'
import { SquareArrowOutUpRight } from 'lucide-react'
import { useCallback, useMemo } from 'react'

import useConfetti from '~hooks/common/useConfetti'

import DirectoryIcon from '~components/directory/DirectoryIcon'
import { Button } from '~components/ui/Button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '~components/ui/Dialog'

type Props = {
  directoryId: string
  setDirectoryId: (id: string) => void
}

function DirectoryDialog({ directoryId, setDirectoryId }: Props) {
  const directory = useMemo(() => directories.find(directory => directory.id === directoryId), [directoryId])
  const fireConfetti = useConfetti()

  const handleMarkAsSubmitted = useCallback(() => {
    fireConfetti()
  }, [
    fireConfetti,
  ])

  if (!directory) return null

  return (
    <Dialog
      open={!!directoryId}
      onOpenChange={() => setDirectoryId('')}
    >
      <DialogContent className="w-min sm:max-w-auto">
        <DialogHeader>
          <DialogClose />
          <DialogTitle>
            <DirectoryIcon directory={directory} />
            {directory.name}
          </DialogTitle>
          <DialogDescription>
            {directory.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <a
            href={directory.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary">
              <SquareArrowOutUpRight className="h-4 w-4" />
              Visit website
            </Button>
          </a>
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
          <Button onClick={handleMarkAsSubmitted}>
            Mark as submitted
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DirectoryDialog
