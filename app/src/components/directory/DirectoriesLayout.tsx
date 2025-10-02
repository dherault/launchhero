import type { PropsWithChildren } from 'react'

import { PageContent, PageSubtitle, PageTitle } from '~components/layout/Page'

function DirectoriesLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PageTitle
        title="Directories"
        analyticsKey="directories"
      />
      <PageSubtitle>
        You don't need to submit to every directory. Focus on the ones that are most relevant to your product and audience.
      </PageSubtitle>
      <PageContent>
        {children}
      </PageContent>
    </>
  )
}

export default DirectoriesLayout
