import type { PropsWithChildren } from 'react'

import { PageContent, PageSubtitle, PageTitle } from '~components/layout/Page'

function ContentLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PageTitle
        title="Project content"
        analyticsKey="content"
      />
      <PageSubtitle>
        A place to manage your project's information.
      </PageSubtitle>
      <PageContent>
        {children}
      </PageContent>
    </>
  )
}

export default ContentLayout
