import { Shield } from 'lucide-react'
import { DateTime } from 'luxon'

import useUsers from '~hooks/data/useUsers'

import pluralize from '~utils/string/pluralize'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~components/ui/Table'

function AdministratorUsers() {
  const users = useUsers()

  return (
    <>
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        <Shield className="h-6 w-6" />
        {users.length}
        {' '}
        {pluralize('User', users.length)}
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Email
            </TableHead>
            <TableHead>
              Created at
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                {user.email}
              </TableCell>
              <TableCell>
                {DateTime.fromISO(user.createdAt).toLocaleString(DateTime.DATETIME_MED)}
              </TableCell>
              <TableCell className="text-right">
                {user.deletedAt ? '❌' : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default AdministratorUsers
