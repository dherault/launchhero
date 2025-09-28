import type { PropsWithChildren } from 'react'

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-y-auto overflow-x-hidden selection:bg-primary selection:text-white">
      {children}
    </div>
  )
}

export default RootLayout
