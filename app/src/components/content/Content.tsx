import { ContentDescription, ContentLogo, ContentName, ContentPunchline, ContentScreenshot, ContentUrl } from '~components/content/Contents'
import ContentSection from '~components/content/ContentSection'

function Content() {
  return (
    <div className="space-y-8">
      <ContentSection title="Basic information">
        <ContentUrl />
        <ContentName />
        <ContentPunchline />
        <ContentDescription />
      </ContentSection>
      <ContentSection title="Media">
        <ContentLogo />
        <ContentScreenshot />
      </ContentSection>
    </div>
  )
}

export default Content
