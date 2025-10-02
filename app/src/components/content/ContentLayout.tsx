import type { PropsWithChildren } from 'react'

import { PageContent, PageSubtitle, PageTitle } from '~components/layout/Page'

function ContentLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PageTitle
        title="Project information"
        analyticsKey="project_information"
      />
      <PageSubtitle>
        A place to manage your project's submission information.
      </PageSubtitle>
      <PageContent>
        {children}
      </PageContent>
    </>
  )
}

export default ContentLayout
