import React, { useState } from 'react';

import StripeTestCards from './StripeTestCards';

import getStripe from '../../../utils/utility/get-stripe';
import { fetchPostJSON } from '../../../utils/utility/api-helpers';
import { formatAmountForDisplay } from '../../../utils/utility/stripe-helpers';
import { EFiat } from '../../../utils/enums/EFiat';
import { ConversionInput } from '../../ui/ConversionInputs';
import { Button } from '@chakra-ui/react';

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmout] = useState('100');
  const [currency, setCurrency] = useState(EFiat.USD);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/v1/stripe/checkout_sessions', {
      amount: parseFloat(amount),
      currency: currency,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ConversionInput
        description="I want to spend"
        drawerTitle="Select Currency"
        amount={amount}
        onChangeAmount={(value: any) => {
          setAmout(value);
        }}
        onChangeCurrency={(value: any) => {
          setCurrency(value);
        }}
        selectedCurrency={currency}
      />
      <StripeTestCards />
      <Button
        type="submit"
        className="checkout-style-background"
        disabled={loading}
      >
        Donate {formatAmountForDisplay(parseFloat(amount), currency)}
      </Button>
    </form>
  );
};

export default CheckoutForm;
