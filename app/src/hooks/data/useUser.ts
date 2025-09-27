import { useContext } from 'react'

import UserContext from '~contexts/data/UserContext'

function useUser() {
  return useContext(UserContext)
}

export default useUser
