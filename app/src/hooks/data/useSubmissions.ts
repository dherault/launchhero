import { useContext } from 'react'

import SubmissionsContext from '~contexts/data/SubmissionsContext'

function useSubmissions() {
  return useContext(SubmissionsContext)
}

export default useSubmissions
