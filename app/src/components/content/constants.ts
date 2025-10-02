import type { DirectoryRequirementType } from 'launchhero-core'

export const IMAGE_UPLOAD_MAX_SIZE_MB = 10

export const labels: Record<DirectoryRequirementType, string> = {
  url: 'Website',
  name: 'Name',
  punchline: 'Punchline',
  description: 'Description',
  icon: 'Icon',
  logo: 'Logo',
  screenshot: 'Screenshots',

  country: 'Country',
  video: 'Video',
  tags: 'Tags',
  'business-model': 'Business Model',
  'interactive-demo': 'Interactive Demo',
  'first-comment': 'First Comment',
  'product-shoutouts': 'Product Shoutouts',
  x: 'X',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  github: 'GitHub',
  dribbble: 'Dribbble',
  youtube: 'YouTube',
  portfolio: 'Portfolio',
  'team-emails': 'Team Emails',
  'is-maker': 'Are you a maker?',
  'launch-date': 'Launch Date',
  funding: 'Funding',
  'promo-code': 'Promo Code',
  platform: 'Platform',
}

export const descriptions: Record<DirectoryRequirementType, string> = {
  url: 'The main URL of your product',
  name: 'The name of your product',
  punchline: 'A short, catchy phrase that summarizes your product',
  description: 'A detailed description of your product, its features, and benefits',
  icon: 'A small icon representing your product. Preferably square with a transparent background.',
  logo: 'Preferably square with a transparent background.',
  screenshot: `Showcasing your product's interface or key features. Try to get at least 3. Max ${IMAGE_UPLOAD_MAX_SIZE_MB}MB.`,

  country: 'The country where your business is based',
  video: 'A promotional or demo video of your product (e.g. YouTube link)',
  tags: 'Relevant tags to categorize your product (e.g. AI, SaaS, Productivity)',
  'business-model': 'How your product makes money (e.g. Free, Freemium, Paid)',
  'interactive-demo': 'A link to an interactive demo or trial of your product',
  'first-comment': 'Your first comment or post about the product launch',
  'product-shoutouts': 'Any shoutouts or testimonials from users or influencers',
  x: 'Your product\'s presence on X (formerly Twitter)',
  instagram: 'Your product\'s Instagram profile link',
  linkedin: 'Your product\'s LinkedIn page link',
  facebook: 'Your product\'s Facebook page link',
  github: 'Your product\'s GitHub repository link (if applicable)',
  dribbble: 'Your product\'s Dribbble profile link (for design-focused products)',
  youtube: 'Your product\'s YouTube channel link (if you have video content)',
  portfolio: 'A link to your personal or company portfolio showcasing your work',
  'team-emails': 'Email addresses of your team members (comma-separated)',
  'is-maker': 'Indicate if you are one of the makers of the product',
  'launch-date': 'The official launch date of your product',
  funding: 'Details about your funding status (e.g. Bootstrapped, Seed, Series A)',
  'promo-code': 'Any promotional codes available for your product (e.g. LAUNCHHERO10)',
  platform: 'The platforms your product is available on (e.g. Web, iOS, Android)',
}

export const placeholders: Partial<Record<DirectoryRequirementType, string>> = {
  url: 'https://yourproduct.com',
  name: 'Your product name',
  punchline: 'The best product ever',
  description: 'Describe your product in a few sentences',

  country: 'USA',
  video: 'https://youtube.com/xyz',
  portfolio: 'https://yourportfolio.com',
  'team-emails': '<team@example.com>',
  funding: 'e.g. Bootstrapped, Pre-seed, Seed, Series A',
  'business-model': 'e.g. Free, Freemium, Paid, SaaS',
  'promo-code': 'e.g. LAUNCHHERO10 for 10% off',
  platform: 'e.g. Web, iOS, Android, SaaS',
}

export default labels
