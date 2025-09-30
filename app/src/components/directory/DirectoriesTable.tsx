import { Ellipsis } from 'lucide-react'
import type { CSSProperties } from 'react'

import useSearchParameter from '~hooks/common/useSearchParameter'

import extractInitials from '~utils/string/extractInitials'

import DirectoryDialog from '~components/directory/DirectoryDialog'
import DirectoryTagChip from '~components/directory/DirectoryTagChip'
import { Button } from '~components/ui/Button'

import directories from '~data/directories'

type Props = {
  hasActions?: boolean
  maxHeight?: CSSProperties['maxHeight']
}

function DirectoriesTable({ maxHeight = 'auto', hasActions = false }: Props) {
  const [directoryId, setDirectoryId] = useSearchParameter('directory', '')

  return (
    <>
      <div className="font-medium text-sm border rounded-xs">
        <div className="p-2 flex items-center gap-2 border-b h-[49px]">
          <div className="w-10" />
          <div className="grow">
            Directory
          </div>
          {hasActions && (
            <div className="w-8" />
          )}
        </div>
        <div
          className="overflow-auto"
          style={{ maxHeight }}
        >
          {directories.map(directory => (
            <div
              key={directory.id}
              className="p-2 border-b last:border-b-0 flex items-center gap-2 hover:bg-neutral-50 cursor-pointer"
              onClick={() => setDirectoryId(directory.id)}
            >
              <div className="flex">
                {!!directory.imageUrl && (
                  <img
                    src={directory.imageUrl}
                    alt={directory.name}
                    className="h-8 w-8 rounded-xs object-contain border"
                  />
                )}
                {!directory.imageUrl && (
                  <div className="flex h-8 w-8 items-center justify-center rounded border bg-neutral-50 text-sm font-medium">
                    {extractInitials(directory.name)}
                  </div>
                )}
              </div>
              <div className="grow flex items-center flex-wrap gap-2">
                {directory.name}
                {directory.tags.map(tag => (
                  <DirectoryTagChip
                    key={tag}
                    directoryTag={tag}
                  />
                ))}
              </div>
              {hasActions && (
                <div className="flex justify-end">
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={event => event.stopPropagation()}
                  >
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <DirectoryDialog
        directoryId={directoryId}
        setDirectoryId={setDirectoryId}
      />
    </>
  )
}

export default DirectoriesTable
