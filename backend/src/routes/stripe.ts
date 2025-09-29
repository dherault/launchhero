import { Router } from 'express'
import {
  ERROR_CODE_PROJECT_NOT_FOUND,
  ERROR_CODE_STRIPE_CUSTOMER_NOT_FOUND,
} from 'launchhero-core'
import type Stripe from 'stripe'
import z from 'zod'

import {
  IS_DEVELOPMENT,
  SECRET_STRIPE_WEBHOOK_SECRET,
} from '~constants'

import retrieveSecret from '~utils/retrieveSecret'

import validate from '~middleware/validate'

import readProject from '~database/readProject'

import deleteProductOrPrice from '~domain/stripe/deleteProductOrPrice'
import getStripeClient from '~domain/stripe/getStripeClient'
import updateCustomerProject from '~domain/stripe/updateCustomerProject'
import upsertPrice from '~domain/stripe/upsertPrice'
import upsertProduct from '~domain/stripe/upsertProduct'

function createStripeRoutes() {
  const router = Router()

  /* ---
    WEBHOOKS
  --- */

  const acceptedEvents = [
    'product.created',
    'product.updated',
    'product.deleted',
    'price.created',
    'price.updated',
    'price.deleted',
    'checkout.session.completed',
    'checkout.session.async_payment_succeeded',
    'checkout.session.async_payment_failed',
    // 'customer.subscription.created',
    // 'customer.subscription.updated',
    // 'customer.subscription.deleted',
  ]

  router.post('/webhook', async (request, response) => {
    console.log('💳 Received Stripe webhook')

    const stripe = await getStripeClient()

    const webhookSecret = IS_DEVELOPMENT && process.env.STRIPE_WEBHOOK_SECRET
      ? process.env.STRIPE_WEBHOOK_SECRET
      : await retrieveSecret(SECRET_STRIPE_WEBHOOK_SECRET)

    const event = await stripe.webhooks.constructEventAsync(
      request.body,
      request.headers['stripe-signature'] as string,
      webhookSecret,
    )

    if (!acceptedEvents.includes(event.type)) {
      response.status(200).send({
        status: 'success',
      })

      return
    }

    console.log('💳 Event', event.type)

    switch (event.type) {
      case 'product.created':
      case 'product.updated': {
        await upsertProduct(event.data.object as Stripe.Product)
        break
      }
      case 'price.created':
      case 'price.updated': {
        await upsertPrice(stripe, event.data.object as Stripe.Price)
        break
      }
      case 'product.deleted': {
        await deleteProductOrPrice(event.data.object as Stripe.Product)
        break
      }
      case 'price.deleted': {
        await deleteProductOrPrice(event.data.object as Stripe.Price)
        break
      }
      // case 'customer.subscription.created':
      // case 'customer.subscription.updated':
      // case 'customer.subscription.deleted': {
      //   const subscription = event.data.object as Stripe.Subscription

      //   await upsertSubscription(
      //     stripe,
      //     subscription.customer as string,
      //     subscription.id,
      //     event.type === 'customer.subscription.created',
      //   )
      //   break
      // }
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
      case 'checkout.session.async_payment_failed': {
        // const checkoutSession = event.data.object as Stripe.Checkout.Session

        // if (checkoutSession.mode === 'subscription') {
        //   const subscriptionId = checkoutSession.subscription as string

        //   await upsertSubscription(
        //     stripe,
        //     checkoutSession.customer as string,
        //     subscriptionId,
        //     true,
        //   )
        // }
        break
      }
    }

    console.log('💳 Stripe webhook processed')

    response.status(200).send({
      status: 'success',
    })
  })

  /* ---
    PORTAL URL
  --- */

  const portalUrlSchema = z.object({
    projectId: z.string().min(1, 'Project id is required').trim(),
    returnUrl: z.url('Return URL must be a valid URL'),
  })

  router.get('/portal-url', validate({ query: portalUrlSchema }), async (request, response) => {
    console.log('💳 Creating portal URL')

    const stripe = await getStripeClient()

    const projectId = request.query.projectId as string
    const returnUrl = request.query.returnUrl as string

    const project = await readProject(projectId)

    if (!project) {
      response.status(404).json({
        status: 'error',
        code: ERROR_CODE_PROJECT_NOT_FOUND,
        message: 'Project not found',
      })

      return
    }

    let { stripeId } = project

    if (!stripeId) {
      const updatePayload = await updateCustomerProject(stripe, project.id)

      stripeId = updatePayload?.stripeId ?? null
    }

    if (!stripeId) {
      response.status(404).json({
        status: 'error',
        code: ERROR_CODE_STRIPE_CUSTOMER_NOT_FOUND,
        message: 'Stripe customer not found',
      })

      return
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeId,
      return_url: returnUrl,
      locale: 'auto',
    })

    response.json({
      status: 'success',
      data: {
        url: session.url,
      },
    })
  })

  /* ---
    CHECKOUT SESSION
  --- */

  const checkoutSessionSchema = z.object({
    projectId: z.string().min(1, 'Project id is required'),
    priceId: z.string().min(1, 'Price id is required'),
    successUrl: z.url('Success URL must be a valid URL'),
    cancelUrl: z.url('Cancel URL must be a valid URL'),
  })

  router.post('/checkout-session', validate({ body: checkoutSessionSchema }), async (request, response) => {
    console.log('💳 Create checkout session')

    const { projectId, priceId, successUrl, cancelUrl } = request.body

    const project = await readProject(projectId)

    if (!project) {
      response.status(404).json({
        status: 'error',
        code: ERROR_CODE_PROJECT_NOT_FOUND,
        message: 'Project not found',
      })

      return
    }

    const stripe = await getStripeClient()
    let { stripeId } = project

    if (!stripeId) {
      const updatePayload = await updateCustomerProject(stripe, project.id)

      stripeId = updatePayload?.stripeId ?? null
    }

    if (!stripeId) {
      response.status(404).json({
        status: 'error',
        code: ERROR_CODE_STRIPE_CUSTOMER_NOT_FOUND,
        message: 'Stripe customer not found',
      })

      return
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeId,
      line_items: [{ price: priceId }],
      mode: 'subscription',
      locale: 'auto',
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    response.json({
      status: 'success',
      data: {
        url: session.url,
      },
    })
  })

  return router
}

export default createStripeRoutes
