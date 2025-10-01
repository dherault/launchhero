import directories from 'launchhero-directories'
import { Check, Link2 } from 'lucide-react'
import type { CSSProperties } from 'react'

import useSearchParameter from '~hooks/common/useSearchParameter'

import DirectoryDialog from '~components/directory/DirectoryDialog'
import DirectoryIcon from '~components/directory/DirectoryIcon'
import DirectorySubmissionStatusChip from '~components/directory/DirectorySubmissionStatusChip'
import DirectoryTagChip from '~components/directory/DirectoryTagChip'
import { Button } from '~components/ui/Button'
import { Checkbox } from '~components/ui/Checkbox'

type Props = {
  hasCheckbox?: boolean
  hasSubmissionStatus?: boolean
  hasWebsite?: boolean
  maxHeight?: CSSProperties['maxHeight']
}

function DirectoriesTable({
  hasCheckbox = false,
  hasSubmissionStatus = false,
  hasWebsite = false,
  maxHeight = 'auto',
}: Props) {
  const [directoryId, setDirectoryId] = useSearchParameter('directory', '')

  return (
    <>
      <div className="border rounded-xs">
        <div className="py-2 px-3 flex items-center gap-3 border-b h-[49px] font-medium text-sm">
          {hasCheckbox && (
            <div className="w-6 flex items-center justify-center">
              <Check className="h-4 w-4" />
            </div>
          )}
          <div className="w-8" />
          <div className="grow">
            Directory
          </div>
          {hasSubmissionStatus && (
            <div>
              Status
            </div>
          )}
          {hasWebsite && (
            <div>
              Website
            </div>
          )}
        </div>
        <div
          className="overflow-auto"
          style={{ maxHeight }}
        >
          {directories.map(directory => (
            <div
              key={directory.id}
              className="py-2 px-3 border-b last:border-b-0 flex items-center gap-3 hover:bg-neutral-50 cursor-pointer"
              onClick={() => setDirectoryId(directory.id)}
            >
              {hasCheckbox && (
                <div className="flex">
                  <Checkbox onClick={event => event.stopPropagation()} />
                </div>
              )}
              <DirectoryIcon directory={directory} />
              <div className="grow flex items-center flex-wrap gap-2">
                <div className="font-medium text-sm">
                  {directory.name}
                </div>
                {directory.tags.map(tag => (
                  <DirectoryTagChip
                    key={tag}
                    directoryTag={tag}
                  />
                ))}
              </div>
              {hasSubmissionStatus && (
                <div>
                  <DirectorySubmissionStatusChip directory={directory} />
                </div>
              )}
              {hasWebsite && (
                <div className="flex justify-end">
                  <a
                    href={directory.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={event => event.stopPropagation()}
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </a>
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
