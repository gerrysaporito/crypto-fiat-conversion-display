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
              {desiredAmount} {desiredCurrency}
            </span>{' '}
            for{' '}
            <span className="font-bold">
              {baseAmount} {baseCurrency}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
