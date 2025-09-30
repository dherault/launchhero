import type { Directory } from 'launchhero-core'
import { Ellipsis } from 'lucide-react'

import { Button } from '~components/ui/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '~components/ui/DropdownMenu'

type Props = {
  directory: Directory
}

function DirectoryAction({ directory }: Props) {
  console.log('directory', directory)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={event => event.stopPropagation()}
        >
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <a
            href={directory.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DropdownMenuItem onClick={event => event.stopPropagation()}>
              Visit website
            </DropdownMenuItem>
          </a>
          <DropdownMenuItem>
            Mark as submitted
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DirectoryAction
