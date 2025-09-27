import { useCallback } from 'react'

function useDownloadImage(url: string | null, name?: string) {
  return useCallback(async () => {
    if (!url) return

    try {
      const response = await fetch(url, { mode: 'cors' })
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `${name ?? 'submit-hero'}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    }
    catch (error) {
      console.error('Failed to download image:', error)
    }
  }, [
    url,
    name,
  ])
}

export default useDownloadImage
