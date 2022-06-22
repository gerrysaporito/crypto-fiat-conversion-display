import React, { useEffect, useState } from 'react';
import { useRequest } from '../../../hooks/useRequest';
import { ECrypto } from '../../../utils/enums/ECrypto';
import { EExchange } from '../../../utils/enums/EExchange';
import { EFiat } from '../../../utils/enums/EFiat';
import { IExchangeRate } from '../../../utils/types/IExchangeRate';
import { Conversion } from '../../../utils/utility/Conversion';
import { ConversionInput } from '../../ui/ConversionInputs';
import { ConversionDisplayExchanges } from './ConversionDisplayExchanges';
import { ConversionDisplaySummary } from './ConversionDisplaySummary';

interface IConversionDisplay {
  cooldown?: number; // Seconds
}

export const ConversionDisplay: React.FC<IConversionDisplay> = ({
  cooldown,
}) => {
  const _cooldown = cooldown || 20;

  /*
   * State Variables
   */
  const [timeLeft, setTimeLeft] = useState<number>(_cooldown);
  const [errors, setErrors] = useState<React.ReactNode | null>(null);
  const [exchange, setExchange] = useState<EExchange>(EExchange.COINBASE);
  const [exchangeRate, setExchangeRate] = useState<IExchangeRate | null>(null);
  const [baseAmount, setBaseAmount] = useState<string>('10');
  const [desiredAmount, setDesiredAmount] = useState<string>('0');
  const [baseCurrency, setBaseCurrency] = useState<EFiat | ECrypto>(EFiat.USD);
  const [desiredCurrency, setDesiredCurrency] = useState<EFiat | ECrypto>(
    ECrypto.ETH
  );
  const [lastUpdated, setLastUpdated] = useState<
    'baseAmount' | 'desiredAmount'
  >('baseAmount');

  /*
   * API Requests
   */
  const { doRequest: callCoinbaseApi, errors: coinbaseErrors } =
    useRequest<IExchangeRate>({
      url: `/api/v1/coinbase/exchange-rate?base=${baseCurrency}&desired=${desiredCurrency}`,
      method: 'get',
    });

  const { doRequest: callFtxApi, errors: ftxErrors } =
    useRequest<IExchangeRate>({
      url: `/api/v1/ftx/exchange-rate?base=${baseCurrency}&desired=${desiredCurrency}`,
      method: 'get',
    });

  const updateExchangeRateData = async (
    callApi: (props?: {}) => Promise<void | IExchangeRate>,
    errors: React.ReactNode
  ): Promise<void> => {
    const data = await callApi();
    if (!data) {
      const message = 'Could not get new data at this time.';
      console.error(message);
      return;
    }
    await setExchangeRate(data ? data : null);
    await setErrors(errors);
  };

  /*
   * Master function to update exchange rates (based on current state variables)
   */
  const updateExchangeRate = async () => {
    switch (exchange) {
      case EExchange.COINBASE: {
        await updateExchangeRateData(callCoinbaseApi, coinbaseErrors);
        break;
      }
      case EExchange.FTX: {
        await updateExchangeRateData(callFtxApi, ftxErrors);
        break;
      }
      default: {
        await updateExchangeRateData(callCoinbaseApi, coinbaseErrors);
        break;
      }
    }
  };

  /*
   * Master function to update amounts displayed on screen (based on current state variables)
   */
  const updateAmounts = async () => {
    if (!exchangeRate) return;

    switch (lastUpdated) {
      case 'baseAmount': {
        await setDesiredAmount(
          Conversion.getExchangedAmount({
            exchangeRate,
            amount: parseFloat(baseAmount),
            base: baseCurrency,
            desired: desiredCurrency,
          })
        );
        break;
      }
      case 'desiredAmount': {
        await setBaseAmount(
          Conversion.getExchangedAmount({
            exchangeRate,
            amount: parseFloat(desiredAmount),
            base: desiredCurrency,
            desired: baseCurrency,
          })
        );
        break;
      }
    }
  };

  /*
   * Update timer whenever exchange/currencies change or when timer runs out
   */
  useEffect(() => {
    updateExchangeRate();
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
  }, [exchange, baseCurrency, desiredCurrency]);

  /*
   * Update data whenver amounts or exchange rates change
   */
  useEffect(() => {
    updateAmounts();
  }, [lastUpdated, baseAmount, desiredAmount, exchangeRate]);

  if (timeLeft === 0) {
    updateExchangeRate();
  }

  useEffect(() => {
    // console.log(baseCurrency, baseAmount);
    // console.log(desiredCurrency, desiredAmount);
    // console.log('lastUpdated', lastUpdated);
    // console.log(exchangeRate);
    // console.log(lastUpdated);
  }, [lastUpdated, exchangeRate]);

  return (
    <div
      className={[
        'relative w-full max-w-sm',
        'rounded-2xl px-10 py-10',
        'text-sm',
        'grid grid-cols-1 gap-5',
      ].join(' ')}
      style={{ backgroundColor: 'lightblue' }}
    >
      <ConversionDisplayExchanges
        setExchange={setExchange}
        selectedExchange={exchange}
      />
      <ConversionInput
        description="I want to spend"
        drawerTitle="Select Currency"
        amount={baseAmount}
        setAmount={setBaseAmount}
        selectedCurrency={baseCurrency}
        setSelectedCurrency={setBaseCurrency}
        lastUpdated="baseAmount"
        setLastUpdated={setLastUpdated}
      />
      <ConversionInput
        description="I want to buy"
        drawerTitle="Select Currency"
        amount={desiredAmount}
        setAmount={setDesiredAmount}
        selectedCurrency={desiredCurrency}
        setSelectedCurrency={setDesiredCurrency}
        lastUpdated="desiredAmount"
        setLastUpdated={setLastUpdated}
      />
      <ConversionDisplaySummary
        baseCurrency={baseCurrency}
        baseAmount={baseAmount}
        desiredCurrency={desiredCurrency}
        desiredAmount={desiredAmount}
        exchangeRate={exchangeRate}
        timeLeft={timeLeft}
      />
    </div>
  );
};
