import type { PropsWithChildren } from 'react'

import useProjects from '~hooks/data/useProjects'

import { PageContent, PageTitle } from '~components/layout/Page'

function OnboardingLayout({ children }: PropsWithChildren) {
  const { projects } = useProjects()

  return (
    <>
      <PageTitle
        title={!projects.length ? 'Welcome to Launch Hero!' : 'Create a new project'}
        analyticsKey="onboarding"
      />
      <PageContent>
        {children}
      </PageContent>
    </>
  )
}

export default OnboardingLayout
