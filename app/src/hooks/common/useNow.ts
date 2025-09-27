import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'

function useNow(refreshInterval: number) {
  const [now, setNow] = useState(DateTime.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(DateTime.now())
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [
    refreshInterval,
  ])

  return now
}

export default useNow
