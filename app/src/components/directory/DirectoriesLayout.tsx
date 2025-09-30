import directories from 'launchhero-directories'
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
        Track your submissions across
        {' '}
        {directories.length}
        {' '}
        directories.
      </PageSubtitle>
      <PageContent>
        {children}
      </PageContent>
    </>
  )
}

export default DirectoriesLayout
