import Stripe from "stripe"

const stripeData: Stripe.StripeConfig = {
    apiVersion: "2023-10-16",
    typescript: true
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!, stripeData)

