import { useCallback, useEffect, useState } from 'react'

import type { ApiInput, ApiMethod } from '~types'

import useApi from '~hooks/api/useApi'
import useUser from '~hooks/data/useUser'

function useApiFetch<Input extends ApiInput = ApiInput, Data = unknown>(
  method: ApiMethod,
  uri: string,
  input: Input = {} as Input,
  enabled = true,
) {
  const { viewer } = useUser()

  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const invoke = useApi<Input, Data>(method, uri)

  const handleFetch = useCallback(async () => {
    if (!viewer) return
    if (!enabled) return
    if (loading) return
    if (success || error) return

    setLoading(true)
    setSuccess(false)
    setError(null)

    try {
      const data = await invoke(input)

      setSuccess(true)
      setData(data)
    }
    catch (error: any) {
      setError(error.message)
    }

    setLoading(false)
  }, [
    enabled,
    input,
    viewer,
    loading,
    success,
    error,
    invoke,
  ])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  return {
    data,
    error,
    success,
    loading,
    refetch: () => {
      setSuccess(false)
      setError(null)
    },
  }
}

export default useApiFetch
