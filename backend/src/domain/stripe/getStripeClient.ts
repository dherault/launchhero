import Stripe from 'stripe'

import { SECRET_STRIPE_SECRET_KEY } from '~constants'

import retrieveSecret from '~utils/retrieveSecret'

import packageJson from '../../../package.json' with { type: 'json' }

async function getStripeClient() {
  const stripeSecretKey = await retrieveSecret(SECRET_STRIPE_SECRET_KEY)

  return new Stripe(stripeSecretKey, {
    appInfo: {
      name: 'Launch Hero backend',
      version: packageJson.version,
    },
  })
}

export default getStripeClient
