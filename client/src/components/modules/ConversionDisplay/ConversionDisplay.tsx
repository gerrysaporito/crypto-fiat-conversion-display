import React, { useEffect, useState } from 'react';
import { ConversionDisplayExchanges } from './ConversionDisplayExchanges';
import { ConversionDisplaySummary } from './ConversionDisplaySummary';
import { ConversionInput } from '../../ui/ConversionInputs';
import { useRequest } from '../../../hooks/useRequest';
import { ECrypto } from '../../../utils/enums/ECrypto';
import { EExchange } from '../../../utils/enums/EExchange';
import { EFiat } from '../../../utils/enums/EFiat';
import { IExchangeRate } from '../../../utils/types/IExchangeRate';
import { Conversion } from '../../../utils/utility/Conversion';

interface IConversionDisplay {
  cooldown?: number; // Seconds
}

/*
 * Main react component to display.
 * Used to handle data, api calls, etc.
 * Sub-components recieve data from here and handle their respective requirements.
 */
export const ConversionDisplay: React.FC<IConversionDisplay> = ({
  cooldown,
}) => {
  const _cooldown = cooldown || 20;

  /*
   * State variables.
   */
  const [timeLeft, setTimeLeft] = useState<number>(_cooldown);
  const [exchange, setExchange] = useState<EExchange>(EExchange.COINBASE);
  const [exchangeRate, setExchangeRate] = useState<IExchangeRate | null>(null);
  const [baseAmount, setBaseAmount] = useState<string>('100');
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
  const {
    doRequest: callCoinbaseApi,
    error: coinbaseError,
    setError: coinbaseSetError,
  } = useRequest<IExchangeRate>({
    url: `/api/v1/coinbase/exchange-rate?base=${baseCurrency}&desired=${desiredCurrency}`,
    method: 'get',
  });

  const {
    doRequest: callFtxApi,
    error: ftxError,
    setError: ftxSetError,
  } = useRequest<IExchangeRate>({
    url: `/api/v1/ftx/exchange-rate?base=${baseCurrency}&desired=${desiredCurrency}`,
    method: 'get',
  });

  /*
   * Clear errors whenever exchange changes, causing entire app to update.
   */
  useEffect(() => {
    coinbaseSetError('');
    ftxSetError('');
  }, [exchange]);

  const error = coinbaseError || ftxError;

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
   * Calls function to get and update exchange rate data given an exchange.
   */
  const updateExchangeRate = async () => {
    switch (exchange) {
      case EExchange.COINBASE: {
        await updateExchangeRateData(callCoinbaseApi);
        break;
      }
      case EExchange.FTX: {
        await updateExchangeRateData(callFtxApi);
        break;
      }
      default: {
        await updateExchangeRateData(callCoinbaseApi);
        break;
      }
    }
  };

  /*
   * Updates state variable amounts while also handling conversion.
   */
  const updateAmounts = async () => {
    if (!exchangeRate) return;

    if (!!error) exchangeRate.rate = 0;

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
   * Hook to start and keep track of countdown timer.
   * Update timer whenever exchange/currencies change or when timer runs out.
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
  }, [exchange, baseCurrency, desiredCurrency, _cooldown]);

  /*
   * Update amount state variables with the data above.
   * Monitors changes in amounts or exchange rates.
   */
  useEffect(() => {
    updateAmounts();
  }, [
    lastUpdated,
    baseAmount,
    desiredAmount,
    exchangeRate,
    exchange,
    baseCurrency,
    desiredCurrency,
  ]);

  /*
   * Updates exchange rate when time runs out.
   * Also clears all inputs if there is an error on the screen.
   */
  useEffect(() => {
    updateAmounts();
    if (timeLeft === 0 && !!!error) updateExchangeRate();
  }, [timeLeft, error]);

  return (
    <div
      className={[
        'relative w-full max-w-[90%] sm:max-w-md min-h-[475px]',
        'rounded-2xl overflow-hidden',
        'text-sm',
        'shadow-md',
      ].join(' ')}
      style={{ backgroundColor: '#111111', color: 'white' }}
    >
      <div className={['mx-10 my-10', 'grid grid-cols-1 gap-5'].join(' ')}>
        <ConversionDisplayExchanges
          setExchange={setExchange}
          selectedExchange={exchange}
        />
        <ConversionInput
          description="I want to spend"
          drawerTitle="Select Currency"
          amount={baseAmount}
          onChangeAmount={(value: any) => {
            setBaseAmount(value);
            setLastUpdated('baseAmount');
          }}
          onChangeCurrency={(value: any) => {
            setBaseCurrency(value);
            setLastUpdated('baseAmount');
          }}
          selectedCurrency={baseCurrency}
        />
        <ConversionInput
          description="I want to buy"
          drawerTitle="Select Currency"
          amount={desiredAmount}
          onChangeAmount={(value: any) => {
            setDesiredAmount(value);
            setLastUpdated('desiredAmount');
          }}
          onChangeCurrency={(value: any) => {
            setDesiredCurrency(value);
            setLastUpdated('desiredAmount');
          }}
          selectedCurrency={desiredCurrency}
        />
        <ConversionDisplaySummary
          baseCurrency={baseCurrency}
          baseAmount={baseAmount}
          desiredCurrency={desiredCurrency}
          desiredAmount={desiredAmount}
          exchangeRate={exchangeRate}
          timeLeft={timeLeft}
          error={!!error}
        />
        <div className="text-[#FF0000]">{error}</div>
      </div>
    </div>
  );
};
