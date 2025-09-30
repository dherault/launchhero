import type { Directory } from 'launchhero-core'
import directories from 'launchhero-directories'
import { SquareArrowOutUpRight } from 'lucide-react'
import { useMemo } from 'react'

import DirectoryIcon from '~components/directory/DirectoryIcon'
import { Button } from '~components/ui/Button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '~components/ui/Dialog'

type Props = {
  directoryId: string
  setDirectoryId: (id: string) => void
}

function DirectoryDialog({ directoryId, setDirectoryId }: Props) {
  const directory = useMemo(() => directories.find(directory => directory.id === directoryId), [directoryId])

  if (!directory) return null

  return (
    <Dialog
      open={!!directoryId}
      onOpenChange={() => setDirectoryId('')}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <DirectoryIcon directory={directory as Directory} />
            {directory.name}
          </DialogTitle>
          <DialogDescription>
            {directory.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setDirectoryId('')}
          >
            Close
          </Button>
          <a
            href={directory.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>
              <SquareArrowOutUpRight className="h-4 w-4" />
              Visit website
            </Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DirectoryDialog
