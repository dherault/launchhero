import { useCallback } from 'react'

import { useCopyTemporaryStatus } from '~hooks/common/useCopyTemporaryStatus'

function useCopyImageToClipboard() {
  const [copiedTemporaryStatus, setCopiedTemporaryStatus] = useCopyTemporaryStatus()

  const copy = useCallback(async (dataUrl: string) => {
    if (!dataUrl) return

    try {
      const res = await fetch(dataUrl) // fetch works directly on data URLs
      const blob = await res.blob()

      if (!navigator.clipboard || !window.ClipboardItem) {
        throw new Error('Clipboard API not supported in this browser')
      }

      const item = new ClipboardItem({ [blob.type]: blob })

      await navigator.clipboard.write([item])

      setCopiedTemporaryStatus(true)
    }
    catch (error) {
      console.error('Failed to copy image:', error)
    }
  }, [
    setCopiedTemporaryStatus,
  ])

  return [copy, copiedTemporaryStatus] as const
}

export default useCopyImageToClipboard
