import { useCallback } from 'react'

import { useCopyTemporaryStatus } from '~hooks/common/useCopyTemporaryStatus'

function useCopyStringToClipboard() {
  const [copiedTemporaryStatus, setCopiedTemporaryStatus] = useCopyTemporaryStatus()

  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')

      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedTemporaryStatus(true)

      return true
    }
    catch (error) {
      console.warn('Copy failed', error)
      setCopiedTemporaryStatus(false)

      return false
    }
  }, [
    setCopiedTemporaryStatus,
  ])

  return [copy, copiedTemporaryStatus] as const
}

export default useCopyStringToClipboard
