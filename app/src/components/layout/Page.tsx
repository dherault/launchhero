import { useEffect, type PropsWithChildren, type ReactNode } from 'react'

import { logAnalytics } from '~firebase'

import useTitle from '~hooks/common/useTitle'

type Props = {
  title: string
  displayTitle?: ReactNode
  icon?: ReactNode
  action?: ReactNode
  analyticsKey: string
}

export function PageTitle({ title, displayTitle, icon, action, analyticsKey }: Props) {
  useTitle(title)

  useEffect(() => {
    if (!analyticsKey) return

    logAnalytics(`view_${analyticsKey}`)
  }, [
    analyticsKey,
  ])

  if (displayTitle === '') return null

  return (
    <div className="mb-4 ml-6 md:ml-0 pt-3 px-8 h-16 shrink-0 flex items-center gap-4">
      {icon}
      <h1 className="text-xl font-semibold text-primary flex items-center gap-2">
        {displayTitle ?? title}
      </h1>
      <div className="grow flex justify-end">
        {action}
      </div>
    </div>
  )
}

export function PageSubtitle({ children }: PropsWithChildren) {
  return (
    <div className="-mt-6 mb-4 text-sm text-neutral-500 px-8">
      {children}
    </div>
  )
}

export function PageContent({ children }: PropsWithChildren) {
  return (
    <div className="pb-4 md:pb-8 px-4 md:px-8 grow flex flex-col relative">
      {children}
    </div>
  )
}
