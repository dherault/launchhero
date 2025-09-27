import { useEffect, useState } from 'react'

function useInitialValueOrNull<T>(value: T) {
  const [firstValue, setFirstValue] = useState(true)

  useEffect(() => {
    setFirstValue(false)
  }, [
    value,
  ])

  return firstValue ? value : null
}

export default useInitialValueOrNull
