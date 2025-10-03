import {
  ContentBusinessModel,
  ContentCountry,
  ContentDescription,
  ContentDribbble,
  ContentFacebook,
  ContentFirstComment,
  ContentFunding,
  ContentGithub,
  ContentIcon,
  ContentInstagram,
  ContentInteractiveDemo,
  ContentIsMaker,
  ContentLaunchDate,
  ContentLinkedin,
  ContentLogo,
  ContentMarket,
  ContentName,
  ContentPlatform,
  ContentPortfolio,
  ContentProductionStatus,
  ContentProductShoutouts,
  ContentPromoCode,
  ContentPunchline,
  ContentScreenshot,
  ContentTags,
  ContentTeamEmails,
  ContentUrl,
  ContentVideo,
  ContentX,
  ContentYoutube,
} from '~components/content/Contents'
import ContentSection from '~components/content/ContentSection'

function Content() {
  return (
    <div className="mt-4">
      <ContentSection title="Basic information">
        <ContentUrl />
        <ContentName />
        <ContentPunchline />
        <ContentDescription />
      </ContentSection>
      <ContentSection title="Media">
        <ContentIcon />
        <ContentLogo />
        <ContentScreenshot />
        <ContentVideo />
      </ContentSection>
      <ContentSection title="Social & links">
        <ContentInstagram />
        <ContentX />
        <ContentLinkedin />
        <ContentFacebook />
        <ContentYoutube />
        <ContentGithub />
        <ContentDribbble />
        <ContentPortfolio />
      </ContentSection>
      <ContentSection title="Product details">
        <ContentCountry />
        <ContentTags />
        <ContentBusinessModel />
        <ContentInteractiveDemo />
        <ContentPlatform />
        <ContentProductionStatus />
        <ContentMarket />
      </ContentSection>
      <ContentSection title="Launch information">
        <ContentFirstComment />
        <ContentProductShoutouts />
        <ContentLaunchDate />
        <ContentPromoCode />
      </ContentSection>
      <ContentSection title="Team & funding">
        <ContentTeamEmails />
        <ContentIsMaker />
        <ContentFunding />
      </ContentSection>
    </div>
  )
}

export default Content
