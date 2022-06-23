import Image from 'next/image';
import React, { useState } from 'react';
import { ECrypto } from '../../../utils/enums/ECrypto';
import { EFiat } from '../../../utils/enums/EFiat';
import { IExchangeRate } from '../../../utils/types/IExchangeRate';
import { Cleaning } from '../../../utils/utility/Cleaning';
import { Expand } from '../../animations/Expand';
import { Caret } from '../../ui/Caret';
import { HorizontalRule } from '../../ui/HorizontalRule';

interface IConversionDisplaySummary {
  exchangeRate: IExchangeRate | null;
  baseAmount: string;
  baseCurrency: EFiat | ECrypto;
  desiredAmount: string;
  desiredCurrency: EFiat | ECrypto;
  timeLeft: number;
}
export const ConversionDisplaySummary: React.FC<IConversionDisplaySummary> = (
  props
) => {
  const {
    timeLeft,
    baseAmount,
    desiredAmount,
    desiredCurrency,
    baseCurrency,
    exchangeRate,
  } = props;
  const [showExtra, setShowExtra] = useState(false);
  const showSummary = !!baseAmount && !!desiredAmount;
  const SummaryInfo = getSummaryInfo(props);

  const onCaretClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault;
    setShowExtra((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between pb-2">
        <p>{showSummary && 'Summary'}</p>
        <div className="flex">
          <p>
            Quote updates in: <span className="tabular-nums">{timeLeft}</span>s
          </p>
        </div>
      </div>

      {/* Card */}
      {showSummary && (
        <div className="h-[80px] text-black flex flex-col rounded-b-lg">
          <div className="rounded-lg overflow-hidden">
            <div className="pl-4 pr-2 pb-2 pt-3 bg-gray-100">
              {/* Summary Banner */}
              <div className="flex justify-between">
                <p>
                  You get{' '}
                  <span className="font-bold tabular-nums">
                    {Cleaning.cleanStringAmount(desiredAmount)}{' '}
                    {desiredCurrency}
                  </span>{' '}
                  for{' '}
                  <span className="font-bold tabular-nums">
                    {Cleaning.cleanStringAmount(baseAmount)} {baseCurrency}
                  </span>
                </p>
                <button onClick={onCaretClick}>
                  <Caret type={showExtra ? 'up' : 'down'} />
                </button>
              </div>
            </div>

            {/* Drawer */}
            <div className="flex h-full">
              <Expand type="vertical" in={showExtra}>
                <div className="w-full bg-gray-100">
                  <div className="pl-4 pr-2 pb-2 ">
                    <HorizontalRule className="pb-2" />
                    {SummaryInfo.map((item, i) => (
                      <div key={i} className="w-full flex justify-between">
                        <p>{item[0]}</p>
                        <p>{item[1]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Expand>
            </div>
          </div>
        </div>
      )}
      {!showSummary && (
        <span className="text-[#FF0000]">
          Please update value to be a non-0 integer
        </span>
      )}
    </div>
  );
};

const getSummaryInfo = ({
  timeLeft,
  baseAmount,
  desiredAmount,
  desiredCurrency,
  baseCurrency,
  exchangeRate,
}: Partial<IConversionDisplaySummary>) => [
  [
    <span className="font-bold">Rate:</span>,
    `1 ${exchangeRate?.desired} = $${Cleaning.cleanStringAmount(
      (1 / (exchangeRate?.rate || Infinity)).toFixed(2).toString() || ''
    )} ${exchangeRate?.base}`,
  ],
];
