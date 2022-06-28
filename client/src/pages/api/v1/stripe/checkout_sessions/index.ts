import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Conversion } from '../../../../../utils/utility/Conversion';
import { formatAmountForStripe } from '../../../../../utils/utility/stripe-helpers';

const stripe = new Stripe(`${process.env.STRIPE_API_SECRET}`!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
});

/*
 * @Endpoint: Creates and returns a stripe checkout session.
 * @Param: amount - The amount in the current currency.
 * @Param: currency - The base currency.
 * @Param: walletAddress - The recipients wallet address.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      amount,
      currency,
      walletAddress: recipientWalletAddress,
    } = req.body;
    try {
      checkValidQueryParams(amount, currency, recipientWalletAddress);

      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        line_items: [
          {
            name: 'Crypto Buy',
            amount: formatAmountForStripe(amount, currency),
            currency: currency,
            quantity: 1,
          },
        ],
        metadata: {
          amount,
          currency,
          recipientWalletAddress,
        },
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      };

      // Execute checkout session
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

/*
 * Query validation.
 *
 * Checks if the parameters passed are valid.
 */
const checkValidQueryParams = (
  amount: string | string[],
  currency: string | string[],
  walletAddress: string | string[]
) => {
  // Check if all parameters are present
  if (!!!amount) throw new Error(`Missing amount parameter from query`);
  if (!!!currency) throw new Error(`Missing currency parameter from query`);
  if (!!!walletAddress)
    throw new Error(`Missing wallet address parameter from query`);

  // Check if amount is a valid number
  if (isNaN(Number(amount)))
    throw new Error(`Amount must be of type number: '${amount}'`);
  if (Number(amount) <= 0)
    throw new Error(`Amount must be greater than 0. Recieved '${amount}'`);

  // Check if selected currencies are of type string
  if (typeof currency !== 'string')
    throw new Error(`amount must be a string: '${amount}'`);

  // Check if currency is supported
  if (!Conversion.isFiat(currency))
    throw new Error(`currency value is not supported: '${currency}'`);
};
