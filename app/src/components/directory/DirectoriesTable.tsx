import { Link2 } from 'lucide-react'

import DirectoryTagChip from '~components/directory/DirectoryTagChip'
import { Button } from '~components/ui/Button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~components/ui/Table'

import directories from '~data/directories'

function DirectoriesTable() {
  return (
    <div className="border rounded-xs">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12" />
            <TableHead className="sticky top-0">
              Directory
            </TableHead>
            <TableHead className="sticky top-0 text-right">
              Website
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="max-h-68 overflow-auto">
        <Table>
          <TableBody>
            {directories.map(directory => (
              <TableRow key={directory.id}>
                <TableCell className="w-8">
                  {!!directory.imageUrl && (
                    <img
                      src={directory.imageUrl}
                      alt={directory.name}
                      className="h-8 w-8 rounded-xs object-contain border"
                    />
                  )}
                  {!directory.imageUrl && (
                    <div className="flex h-8 w-8 items-center justify-center rounded border bg-neutral-50 text-sm font-medium">
                      {directory.name[0].toUpperCase()}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center flex-wrap gap-1">
                    <span className="mr-2 font-medium">
                      {directory.name}
                    </span>
                    {directory.tags.map(tag => (
                      <DirectoryTagChip
                        key={tag}
                        directoryTag={tag}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <a
                    href={directory.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-block"
                  >
                    <Button
                      variant="ghost"
                      size="icon-sm"
                    >
                      <Link2 className="h-4 w-4" />

                    </Button>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DirectoriesTable
