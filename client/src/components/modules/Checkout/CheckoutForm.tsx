import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <form>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  );
};
