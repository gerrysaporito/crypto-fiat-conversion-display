import React, { useEffect, useState } from 'react';
import useRequest from '../../../hooks/useRequest';
import { ECrypto } from '../../../utils/enums/ECrypto';
import { EExchange } from '../../../utils/enums/EExchange';
import { EFiat } from '../../../utils/enums/EFiat';
import { IExchangeRate } from '../../../utils/types/IExchangeRate';
import { Conversion } from '../../../utils/utility/Conversion';

interface IConversionDisplay {}

export const ConversionDisplay: React.FC<IConversionDisplay> = () => {
  /*
   * State Variables
   */
  const [errors, setErrors] = useState<React.ReactNode | null>(null);
  const [exchange, setExchange] = useState<EExchange>(EExchange.COINBASE);
  const [baseAmount, setBaseAmount] = useState<number>(10);
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
    await setDesiredAmount(Conversion.getDesiredAmount(data, baseAmount));
  };

  /*
   * Update desired amounts and errors whenever exchange is changed
   */
  useEffect(() => {
    switch (exchange) {
      case EExchange.COINBASE: {
        updateConversion(callCoinbaseApi, coinbaseErrors);
        break;
      }
      case EExchange.FTX: {
        updateConversion(callFtxApi, ftxErrors);
        break;
      }
      default: {
        updateConversion(callCoinbaseApi, coinbaseErrors);
        break;
      }
    }
  }, [
    exchange,
    baseAmount,
    coinbaseErrors,
    ftxErrors,
    callCoinbaseApi,
    callFtxApi,
    updateConversion,
  ]);
  /*
   * Event Handlers
   */
  const changeExchange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    event.preventDefault();
    const value = event.target.value;
    const _exchanges = Object.keys(EExchange);

    // Check if exchange exists
    if (_exchanges.includes(value)) {
      const _exchange = _exchanges[_exchanges.indexOf(value)];
      setExchange(_exchange as EExchange);
    } else console.error('Invalid Exchange');
  };

  console.log(baseCurrency, baseAmount);
  console.log(desiredCurrency, desiredAmount);
  return (
    <div id="CONVERSION_DISPLAY" className="w-full h-full">
      <select onChange={changeExchange}>
        {Object.keys(EExchange).map((key, i) => (
          <option key={i} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
