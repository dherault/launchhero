import type { Price } from 'launchhero-core'
import type Stripe from 'stripe'

import upsertDatabasePrice from '~database/upsertPrice'

async function upsertPrice(stripe: Stripe, stripePrice: Stripe.Price) {
  // Tiers aren't included by default, we need to retireve and expand.
  if (stripePrice.billing_scheme === 'tiered') {
    stripePrice = await stripe.prices.retrieve(stripePrice.id, { expand: ['tiers'] })
  }

  const price: Price = {
    id: stripePrice.id,
    active: stripePrice.active,
    currency: stripePrice.currency,
    description: stripePrice.nickname,
    type: stripePrice.type,
    unitAmount: stripePrice.unit_amount,
    interval: stripePrice.recurring?.interval ?? null,
    intervalCount: stripePrice.recurring?.interval_count ?? null,
    trialPeriodDays: stripePrice.recurring?.trial_period_days ?? null,
  }

  await upsertDatabasePrice(stripePrice.product as string, price)
}

export default upsertPrice
