import {
  API_URL,
  ERROR_CODE_INTERNAL_ERROR,
} from 'launchhero-core'
import { useCallback } from 'react'

import { ApiError, type ApiInput, type ApiMethod, type EmptyApiInput } from '~types'

function useApiUnauthenticated<Input extends ApiInput = EmptyApiInput, Data = unknown>(method: ApiMethod, uri: string) {
  return useCallback(async ({ query, body } = {} as Input) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    let url = `${API_URL}/${uri}`

    if (query) url += `?${new URLSearchParams(query)}`

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json()

    if (data.status === 'success') return data.data as Data
    if (data.status === 'error') {
      console.error(`❌ API Error code ${data.code}:`, data.message)

      throw new ApiError(data.code, data.message)
    }

    throw new ApiError(ERROR_CODE_INTERNAL_ERROR, 'Unknown server error')
  }, [
    method,
    uri,
  ])
}

export default useApiUnauthenticated
