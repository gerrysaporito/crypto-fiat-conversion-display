import React, { useEffect, useState } from 'react';

import StripeTestCards from './StripeTestCards';

import getStripe from '../../../utils/utility/get-stripe';
import { fetchPostJSON } from '../../../utils/utility/api-helpers';
import { formatAmountForDisplay } from '../../../utils/utility/stripe-helpers';
import { EFiat } from '../../../utils/enums/EFiat';
import { ConversionInput } from '../../ui/ConversionInputs';
import { Button } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useRequest } from '../../../hooks/useRequest';
import { IExchangeRate } from '../../../utils/types/IExchangeRate';
import { ECrypto } from '../../../utils/enums/ECrypto';
import { Conversion } from '../../../utils/utility/Conversion';

interface ICheckoutForm {
  cooldown?: number;
}

const CheckoutForm: React.FC<ICheckoutForm> = ({ cooldown }) => {
  const _cooldown = cooldown || 20;
  const { account } = useWeb3React();

  /*
   * State variables.
   */
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(_cooldown);
  const [exchangeRate, setExchangeRate] = useState<IExchangeRate | null>(null);
  const [baseAmount, setBaseAmount] = useState<string>('100');
  const [desiredAmount, setDesiredAmount] = useState<string>('0');
  const [baseCurrency, setBaseCurrency] = useState<EFiat | ECrypto>(EFiat.USD);
  const [desiredCurrency, setDesiredCurrency] = useState<EFiat | ECrypto>(
    ECrypto.ETH
  );

  /*
   * API Requests
   */
  const {
    doRequest: callCoinbaseApi,
    error: coinbaseError,
    setError: coinbaseSetError,
  } = useRequest<IExchangeRate>({
    url: `/api/v1/coinbase/exchange-rate?base=${baseCurrency}&desired=${desiredCurrency}`,
    method: 'get',
  });

  const error = coinbaseError;

  /*
   * Calls the api given the proper exchange api-calling functions.
   * Also updates the relevent state variables once the data is recieved.
   */
  const updateExchangeRateData = async (
    callApi: (props?: {}) => Promise<void | IExchangeRate>
  ): Promise<void> => {
    const data = await callApi();
    if (!data) return;
    setExchangeRate(data ? data : null);
  };

  /*
   * Updates state variable amounts while also handling conversion.
   */
  const updateAmounts = async () => {
    if (!exchangeRate) return;

    if (!!error) exchangeRate.rate = 0;

    await setDesiredAmount(
      Conversion.getExchangedAmount({
        exchangeRate,
        amount: parseFloat(baseAmount),
        base: baseCurrency,
        desired: desiredCurrency,
      })
    );
  };

  /*
   * Hook to start and keep track of countdown timer.
   * Update timer whenever exchange/currencies change or when timer runs out.
   */
  useEffect(() => {
    updateExchangeRateData(callCoinbaseApi);
    setTimeLeft(_cooldown);

    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => {
          return prev > 0 ? prev - 1 : _cooldown;
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [baseCurrency, desiredCurrency, _cooldown]);

  /*
   * Update amount state variables with the data above.
   * Monitors changes in amounts or exchange rates.
   */
  useEffect(() => {
    updateAmounts();
  }, [baseAmount, desiredAmount, exchangeRate, baseCurrency, desiredCurrency]);

  /*
   * Updates exchange rate when time runs out.
   * Also clears all inputs if there is an error on the screen.
   */
  useEffect(() => {
    updateAmounts();
    if (timeLeft === 0 && !!!error) updateExchangeRateData(callCoinbaseApi);
  }, [timeLeft, error]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/v1/stripe/checkout_sessions', {
      amount: parseFloat(baseAmount),
      currency: baseCurrency,
      walletAddress: account,
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
    <div
      className={['overflow-hidden', 'text-sm', 'shadow-md'].join(' ')}
      style={{ backgroundColor: '#111111', color: 'white' }}
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        <h2 className="text-xl sm:text-2xl font-semibold flex items-between">
          Buy Ethereum
        </h2>
        <ConversionInput
          description="I want to spend"
          drawerTitle="Select Currency"
          amount={baseAmount}
          onChangeAmount={(value: any) => {
            setBaseAmount(value);
          }}
          onChangeCurrency={(value: any) => {
            setBaseCurrency(value);
          }}
          selectedCurrency={baseCurrency}
        />
        <ConversionInput
          disabled
          description="I will receive about (minus gas)"
          drawerTitle=""
          amount={desiredAmount}
          onChangeAmount={(value: any) => {
            setDesiredAmount(value);
          }}
          onChangeCurrency={(value: any) => {
            setDesiredCurrency(value);
          }}
          selectedCurrency={'ETH'}
        />
        <div className="flex justify-between">
          <p className="italic">Quote from Coinbase</p>
          <p>
            Quote updates in: <span className="tabular-nums">{timeLeft}</span>s
          </p>
        </div>
        <Button type="submit" disabled={loading} color="black" width="full">
          Buy{' '}
          {parseFloat(baseAmount) > 0
            ? formatAmountForDisplay(parseFloat(baseAmount), baseCurrency)
            : 0}{' '}
          {baseCurrency} in ETH
        </Button>
        <StripeTestCards />

        {error && <div className="text-[#FF0000]">{error}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
