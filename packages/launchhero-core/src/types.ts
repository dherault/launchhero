/* ---
  Database resources
--- */

export type DatabaseResource<T = unknown> = T & {
  id: string
  userId: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type User = DatabaseResource<{
  email: string
  name: string | null
  imageUrl: string | null
  signInProviders: SignInProvider[]
  timeZone: string
  hasVerifiedEmail: boolean
  hasSentVerificationEmail: boolean
  hasSentWelcomeEmail: boolean
  isAdministrator: boolean
}>

export type SignInProvider = 'password' | 'google.com'

export type Project = DatabaseResource<{
  name: string
  imageUrl: string | null
  isPublic: boolean
  administratorUserIds: string[]
  memberUserIds: string[]
  stripeId: string | null
  stripeLink: string | null
}>

export type ProjectInvitation = DatabaseResource<{
  email: string
  projectId: string
  projectName: string
  projectImageUrl: string | null
  inviterName: string
}>

export type Submission = DatabaseResource<{
  directoryId: string
  url: string | null
}>

/* ---
  Directory
--- */

export type Directory = {
  id: string
  type: 'directory'
  name: string
  description: string
  url: string
  imageUrl: string | null
  tags: DirectoryTag[]
}

export type DirectoryTag = 'community'

/* ---
  STRIPE
--- */

export interface CustomerData {
  metadata: {
    projectId: string
  }
}

export interface Price {
  id: string
  /**
   * Whether the price can be used for new purchases.
   */
  active: boolean
  currency: string
  unitAmount: number | null
  /**
   * A brief description of the price.
   */
  description: string | null
  /**
   * One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
   */
  type: 'one_time' | 'recurring'
  /**
   * The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.
   */
  interval: 'day' | 'month' | 'week' | 'year' | null
  /**
   * The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.
   */
  intervalCount: number | null
  /**
   * Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https://stripe.com/docs/api#create_subscription-trial_from_plan).
   */
  trialPeriodDays: number | null
  // billingScheme: Stripe.Price.BillingScheme
  // tiersMode: Stripe.Price.TiersMode | null
  // tiers: Stripe.Price.Tier[] | null
  // recurring: Stripe.Price.Recurring | null
  // transformQuantity: Stripe.Price.TransformQuantity | null
  // taxBehavior: Stripe.Price.TaxBehavior | null
  // metadata: Stripe.Metadata | null
}

export interface Product {
  id: string
  /**
   * Whether the product is currently available for purchase.
   */
  active: boolean
  /**
   * The product's name, meant to be displayable to the customer. Whenever this product is sold via a subscription, name will show up on associated invoice line item descriptions.
   */
  name: string
  /**
   * The product's description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.
   */
  description: string | null
  /**
   * The role that will be assigned to the user if they are subscribed to this plan.
   */
  role: string | null
  /**
   * A list of up to 8 URLs of images for this product, meant to be displayable to the customer.
   */
  images: Array<string>
  /**
   * A list of Prices for this billing product.
   */
  prices?: Array<Price>
}
