import type { PropsWithChildren } from 'react'

import { PageSubtitle, PageTitle } from '~components/layout/Page'

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
      {children}
    </>
  )
}

export default ContentLayout
