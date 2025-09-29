import type { Product } from 'launchhero-core'
import type Stripe from 'stripe'

import upsertProductDatabase from '~database/upsertProduct'

async function upsertProduct(stripeProduct: Stripe.Product) {
  const product: Product = {
    id: stripeProduct.id,
    active: stripeProduct.active,
    name: stripeProduct.name,
    description: stripeProduct.description,
    images: stripeProduct.images,
    role: null,
  }

  await upsertProductDatabase(product)

  return product
}

export default upsertProduct
