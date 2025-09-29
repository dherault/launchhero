import type { CustomerData, Project } from 'launchhero-core'
import type Stripe from 'stripe'

import updateProject from '~database/updateProject'

async function updateCustomerProject(stripe: Stripe, projectId: string) {
  try {
    const customerData: CustomerData = {
      metadata: {
        projectId,
      },
    }

    const customer = await stripe.customers.create(customerData)

    const updatePayload: Partial<Project> = {
      stripeId: customer.id,
      stripeLink: `https://dashboard.stripe.com${customer.livemode ? '' : '/test'}/customers/${customer.id}`,
    }

    await updateProject(projectId, updatePayload)

    return updatePayload
  }
  catch (error) {
    console.error('❌ Error creating Stripe customer:', error)

    return null
  }
}

export default updateCustomerProject
