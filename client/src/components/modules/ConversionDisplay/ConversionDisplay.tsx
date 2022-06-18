import { useState } from 'react';

interface IConversionDisplay {}

export const ConversionDisplay: React.FC<IConversionDisplay> = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('btc');
  const [rate, setRate] = useState(0);

  return <div id="CONVERSION_DISPLAY" className="w-full h-full"></div>;
};
