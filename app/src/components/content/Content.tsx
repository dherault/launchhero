import { ContentName, ContentPunchline, ContentUrl } from '~components/content/Contents'
import ContentSection from '~components/content/ContentSection'

function Content() {
  return (
    <div className="space-y-8">
      <ContentSection title="Basic information">
        <ContentUrl />
        <ContentName />
        <ContentPunchline />
      </ContentSection>
    </div>
  )
}

export default Content
