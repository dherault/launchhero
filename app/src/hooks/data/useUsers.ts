import { useContext } from 'react'

import UsersContext from '~contexts/data/UsersContext'

function useUsers() {
  return useContext(UsersContext)
}

export default useUsers
