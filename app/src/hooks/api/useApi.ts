import {
  API_URL,
  ERROR_CODE_INTERNAL_ERROR,
  ERROR_CODE_INVALID_BEARER_TOKEN,
  ERROR_CODE_NO_BEARER_TOKEN,
  ERROR_CODE_USER_NOT_FOUND,
} from 'launchhero-core'
import { useCallback } from 'react'

import { ApiError, type ApiInput, type ApiMethod, type ApiResponse, type EmptyApiInput } from '~types'

import useUser from '~hooks/data/useUser'

const SIGN_OUT_ERROR_CODES = [
  ERROR_CODE_NO_BEARER_TOKEN,
  ERROR_CODE_INVALID_BEARER_TOKEN,
  ERROR_CODE_USER_NOT_FOUND,
]

function useApi<Input extends ApiInput = EmptyApiInput, Data = unknown>(method: ApiMethod, uri: string) {
  const { viewer, signOut } = useUser()

  return useCallback(async ({ query, body } = {} as Input) => {
    if (!viewer) throw new Error('User is not authenticated')

    const idToken = await viewer.getIdToken()

    let url = `${API_URL}${uri}`

    if (query) url += `?${new URLSearchParams(query)}`

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json() as ApiResponse

    if (data.status === 'success') return data.data as Data
    if (data.status === 'error') {
      console.error(`❌ API Error code ${data.code}: ${data.message}`)

      if (SIGN_OUT_ERROR_CODES.includes(data.code)) signOut()

      throw new ApiError(data.code, data.message)
    }

    console.error('❌ API Error')

    throw new ApiError(ERROR_CODE_INTERNAL_ERROR, 'Unknown server error')
  }, [
    method,
    uri,
    viewer,
    signOut,
  ])
}

export default useApi
