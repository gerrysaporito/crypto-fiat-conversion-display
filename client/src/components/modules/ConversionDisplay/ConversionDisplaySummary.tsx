import { useState } from 'react';
import { ECrypto } from '../../../utils/enums/ECrypto';
import { EFiat } from '../../../utils/enums/EFiat';
import { IExchangeRate } from '../../../utils/types/IExchangeRate';

interface IConversionDisplaySummary {
  exchangeRate: IExchangeRate | null;
  baseAmount: string;
  baseCurrency: EFiat | ECrypto;
  desiredAmount: string;
  desiredCurrency: EFiat | ECrypto;
  timeLeft: number;
}
export const ConversionDisplaySummary: React.FC<IConversionDisplaySummary> = ({
  exchangeRate,
  baseAmount,
  baseCurrency,
  desiredAmount,
  desiredCurrency,
  timeLeft,
}) => {
  const [showExtra, setShowExtra] = useState(true);

  const SummaryInfo = [[``]];
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p>Summary</p>
        <div className="flex">
          <p>
            Quote updates in: <span className="tabular-nums">{timeLeft}</span>s
          </p>
        </div>
      </div>

      {/* Card */}
      <div>
        <div>
          <p>
            You get{' '}
            <span className="font-bold">
              {cleanAmount(desiredAmount)} {desiredCurrency}
            </span>{' '}
            for{' '}
            <span className="font-bold">
              {cleanAmount(baseAmount)} {baseCurrency}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const cleanAmount = (amount: string) => {
  const hasDecimals = amount.split('.')[1]?.replace(/^0+/, '').length > 0;
  const startsWith0 = amount.split('.')[0]?.replace(/^0+/, '').length === 0;

  return hasDecimals && startsWith0
    ? '0' + amount.replace(/^0+/, '')
    : amount.replace(/^0+/, '');
};
