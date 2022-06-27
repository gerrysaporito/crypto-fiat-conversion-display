/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_API_KEY}`);
  }
  return stripePromise;
};

export default getStripe;
