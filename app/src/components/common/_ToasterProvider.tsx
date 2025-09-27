import type { PropsWithChildren } from 'react'

import { Toaster } from '~components/ui/Toaster'

function ToasterProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

export default ToasterProvider
