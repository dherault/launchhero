import { type PropsWithChildren } from 'react'

import Sidebar from '~components/layout/Sidebar'
import { SidebarTrigger } from '~components/ui/Sidebar'

function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="grow flex flex-col h-screen overflow-auto relative">
        <div className="flex md:hidden absolute top-[26px] left-4 z-50">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </div>
  )
}

export default SidebarLayout
