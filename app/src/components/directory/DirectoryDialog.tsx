import { useMemo } from 'react'

import { Button } from '~components/ui/Button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '~components/ui/Dialog'

import directories from '~data/directories'

type Props = {
  directoryId: string
  setDirectoryId: (id: string) => void
}

function DirectoryDialog({ directoryId, setDirectoryId }: Props) {
  const directory = useMemo(() => directories.find(d => d.id === directoryId), [directoryId])

  if (!directory) return null

  return (
    <Dialog
      open={!!directoryId}
      onOpenChange={() => setDirectoryId('')}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {directory.name}
          </DialogTitle>
          <DialogDescription>
            A directory
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setDirectoryId('')}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DirectoryDialog
