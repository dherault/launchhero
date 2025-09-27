import { useEffect, useState } from 'react'

export function useCopyTemporaryStatus() {
  const [copiedTemporaryStatus, setCopiedTemporaryStatus] = useState(false)

  useEffect(() => {
    if (!copiedTemporaryStatus) return

    const timeoutId = setTimeout(() => {
      setCopiedTemporaryStatus(false)
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [
    copiedTemporaryStatus,
  ])

  return [copiedTemporaryStatus, setCopiedTemporaryStatus] as const
}
