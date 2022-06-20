import React, { useEffect, useState } from 'react';
import useRequest from '../../../hooks/useRequest';
import { ECrypto } from '../../../utils/enums/ECrypto';
import { EExchange } from '../../../utils/enums/EExchange';
import { EFiat } from '../../../utils/enums/EFiat';
import { IExchangeRate } from '../../../utils/types/IExchangeRate';

interface IConversionDisplay {}

export const ConversionDisplay: React.FC<IConversionDisplay> = () => {
  /*
   * State Variables
   */
  const [errors, setErrors] = useState<React.ReactNode | null>(null);
  const [exchange, setExchange] = useState<EExchange>(EExchange.COINBASE);
  const [baseAmount, setBaseAmount] = useState<number>(10);
  const [baseCurrency, setBaseCurrency] = useState<EFiat | ECrypto>(
    ECrypto.ETH
  );
  const [desiredAmount, setDesiredAmount] = useState<number>(0);
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
      url: `/api/v1/coinbase/exchange-rate?base=${baseCurrency}&desired=${desiredCurrency}`,
      method: 'get',
    });

  const updateCoinbaseConversion = async () => {
    const data = await callCoinbaseApi();
    if (!data) return;
    console.log(data);
    await setErrors(coinbaseErrors);
  };

  const updateFtxConversion = async () => {
    const data = await callFtxApi();
    if (!data) return;
    console.log(data);
    await setErrors(ftxErrors);
  };

  /*
   * Update desired amounts and errors whenever exchange is changed
   */
  useEffect(() => {
    console.log(exchange);
    switch (exchange) {
      case EExchange.COINBASE: {
        updateCoinbaseConversion();
        break;
      }
      case EExchange.FTX: {
        updateFtxConversion();
        break;
      }
      default: {
        updateCoinbaseConversion();
        break;
      }
    }
  }, [exchange]);

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
