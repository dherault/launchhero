import type Stripe from 'stripe'

import deletePrice from '~database/deletePrice'
import deleteProduct from '~database/deleteProduct'

async function deleteProductOrPrice(stripeProductOrPrice: Stripe.Product | Stripe.Price) {
  if (stripeProductOrPrice.object === 'product') {
    await deleteProduct(stripeProductOrPrice.id)
  }

  if (stripeProductOrPrice.object === 'price') {
    await deletePrice((stripeProductOrPrice as Stripe.Price).product as string, stripeProductOrPrice.id)
  }
}

export default deleteProductOrPrice
