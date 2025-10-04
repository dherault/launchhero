import { type SetStateAction, useCallback, useEffect, useState } from 'react'

type Options = {
  enabled?: boolean
  parser?: (x: any) => any
}

const identity = (x: any) => x

// useState with localStorage persistence
function usePersistedState<T>(key: string, defaultValue: T, options?: Options) {
  const { parser = identity, enabled = true } = options || {}

  const getLocalStorageKey = useCallback(() => import.meta.env.DEV ? `launchhero:${key}` : key, [key])

  const getLocalStorageValue = useCallback(() => {
    if (!enabled) return defaultValue

    try {
      const item = localStorage.getItem(getLocalStorageKey())

      if (item) return parser(JSON.parse(item))
    }
    catch {
      console.log('Error on localStorage.getItem of', key)
    }

    return defaultValue
  }, [
    key,
    defaultValue,
    enabled,
    getLocalStorageKey,
    parser,
  ])

  const [state, setState] = useState<T>(getLocalStorageValue())

  const setLocalStorageState = useCallback((nextState: SetStateAction<T>) => {
    if (!enabled) return

    setState(x => {
      // @ts-expect-error
      const nextX = typeof nextState === 'function' ? nextState(x) : nextState

      localStorage.setItem(getLocalStorageKey(), JSON.stringify(nextX))

      return nextX
    })
  }, [
    enabled,
    getLocalStorageKey,
  ])

  const resetLocalStorageState = useCallback(() => {
    setLocalStorageState(defaultValue)
  }, [
    defaultValue,
    setLocalStorageState,
  ])

  // Sync localStorage with defaultValue at start
  useEffect(() => {
    localStorage.setItem(getLocalStorageKey(), JSON.stringify(state))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reset the state on key change
  useEffect(() => {
    setState(getLocalStorageValue())
  }, [
    getLocalStorageValue,
  ])

  return [state, setLocalStorageState, resetLocalStorageState] as const
}

export default usePersistedState
