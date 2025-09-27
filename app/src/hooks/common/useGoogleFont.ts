import { useEffect } from 'react'

function useGoogleFont(fontConfiguration: string) {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${fontConfiguration}&display=swap`
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [
    fontConfiguration,
  ])
}

export default useGoogleFont
