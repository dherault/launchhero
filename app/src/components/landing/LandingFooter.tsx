import GitHubButton from 'react-github-btn'
import { Link } from 'react-router'

import { LEGAL_COMPANY_NAME } from '~constants'

import LogoType from '~components/common/logos/LogoType'

function LandingFooter() {
  return (
    <footer className="mt-32 lg:mt-48 mx-auto pb-8 md:pb-16 px-4 w-full max-w-4xl flex flex-col items-start md:flex-row md:justify-between gap-y-2">
      <div className="md:h-full flex flex-col gap-2">
        <Link to="/">
          <LogoType />
        </Link>
        <div className="mt-2 text-sm text-neutral-700">
          Copyright ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          {LEGAL_COMPANY_NAME}
        </div>
        <div className="text-sm text-neutral-700">
          Made with ❤️ in Finland 🇫🇮
        </div>
        <div className="flex gap-2">
          <div className="text-sm text-neutral-700">
            Submit Hero is open source!
          </div>
          <div className="-mt-1 flex">
            <GitHubButton
              href="https://github.com/dherault/submithero"
              data-color-scheme="no-preference: light; light: light; dark: dark;"
              data-size="large"
              data-show-count="true"
              aria-label="Star dherault/submithero on GitHub"
            >
              Star
            </GitHubButton>
          </div>
        </div>
      </div>
      <div className="md:mt-1.5 flex flex-col md:flex-row gap-y-2 gap-x-12">
        <div className="mt-6 md:mt-0 flex flex-col gap-2 md:gap-4">
          <div className="md:mb-2 text-sm font-semibold">
            Resources
          </div>
          <Link
            to="/support"
            className="text-sm text-neutral-700 hover:underline"
          >
            Support
          </Link>
          <Link
            to="/legal"
            className="text-sm text-neutral-700 hover:underline"
          >
            Privacy Policy & Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter
