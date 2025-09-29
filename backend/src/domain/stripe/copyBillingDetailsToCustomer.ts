import type Stripe from 'stripe'

async function copyBillingDetailsToCustomer(stripe: Stripe, paymentMethod: Stripe.PaymentMethod) {
  const customer = paymentMethod.customer as string
  const { name, phone, address } = paymentMethod.billing_details

  // @ts-expect-error
  await stripe.customers.update(customer, { name, phone, address })
}

export default copyBillingDetailsToCustomer
