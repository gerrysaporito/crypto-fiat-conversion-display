import React, { useEffect, useState } from 'react';
import useRequest from '../../../hooks/useRequest';
import { ECrypto } from '../../../utils/enums/ECrypto';
import { EExchange } from '../../../utils/enums/EExchange';
import { EFiat } from '../../../utils/enums/EFiat';
import { IExchangeRate } from '../../../utils/types/IExchangeRate';
import { Conversion } from '../../../utils/utility/Conversion';
import { ConversionDisplayExchanges } from './ConversionDisplayExchanges';
import { ConversionDisplayInputs } from './ConversionDisplayInputs';

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
  const [baseAmount, setBaseAmount] = useState<string>('10');
  const [desiredAmount, setDesiredAmount] = useState<string>('0');
  const [baseCurrency, setBaseCurrency] = useState<EFiat | ECrypto>(
    ECrypto.ETH
  );
  const [desiredCurrency, setDesiredCurrency] = useState<EFiat | ECrypto>(
    EFiat.USD
  );

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

  const updateConversion = async (
    callApi: (props?: {}) => Promise<void | IExchangeRate>,
    errors: React.ReactNode
  ): Promise<void> => {
    const data = await callApi();
    if (!data) {
      console.error('Could not get new data at this time.');
      return;
    }
    await setErrors(errors);
    await setDesiredAmount(
      Conversion.getDesiredAmount(data, parseFloat(baseAmount))
    );
  };

  const updateData = async () => {
    switch (exchange) {
      case EExchange.COINBASE: {
        await updateConversion(callCoinbaseApi, coinbaseErrors);
        break;
      }
      case EExchange.FTX: {
        await updateConversion(callFtxApi, ftxErrors);
        break;
      }
      default: {
        await updateConversion(callCoinbaseApi, coinbaseErrors);
        break;
      }
    }
  };

  /*
   * Update data whenever exchange/base amount is changed or when timer runs out
   */
  useEffect(() => {
    updateData();
    setTimeLeft(_cooldown);

    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => {
          if (timeLeft === 0) updateData();

          return prev > 0 ? prev - 1 : _cooldown;
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [exchange, baseAmount, baseCurrency, desiredCurrency]);

  if (timeLeft === 0) updateData();

  useEffect(() => {
    // console.log(baseCurrency, baseAmount);
    // console.log(desiredCurrency, desiredAmount);
  }, [baseCurrency, desiredCurrency]);

  return (
    <div
      className={[
        'h-full max-h-[600px] w-full max-w-sm',
        'rounded-2xl',
        'px-10 py-10',
      ].join(' ')}
      style={{ backgroundColor: 'lightblue' }}
    >
      <ConversionDisplayExchanges
        setExchange={setExchange}
        selectedExchange={exchange}
      />
      <ConversionDisplayInputs
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        baseAmount={baseAmount}
        setBaseAmount={setBaseAmount}
        desiredCurrency={desiredCurrency}
        setDesiredCurrency={setDesiredCurrency}
        desiredAmount={desiredAmount}
        setDesiredAmount={setBaseAmount}
      />
      timeLeft: {timeLeft}
    </div>
  );
};
