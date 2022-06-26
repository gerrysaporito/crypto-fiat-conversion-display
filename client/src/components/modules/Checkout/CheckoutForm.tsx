import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const HOSTNAME = 'https://crypto-fiat-conversion-display.vercel.app/';

/*
 * Stripe configurations.
 */
const stripePromise = loadStripe('pk_test_A7jK4iCYHL045qgjjfzAfPxu');
const options = {
  // passing the client secret obtained from the server
  clientSecret: '{{CLIENT_SECRET}}',
};

export const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    // Ensure stripe is loaded before submitting
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${HOSTNAME}/order/123/complete`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  );
};
