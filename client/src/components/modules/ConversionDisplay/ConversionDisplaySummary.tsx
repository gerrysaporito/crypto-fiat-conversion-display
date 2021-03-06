import React, { useState } from 'react';
import { Expand } from '../../animations/Expand';
import { Caret } from '../../ui/Caret';
import { HorizontalRule } from '../../ui/HorizontalRule';
import { ECrypto } from '../../../utils/enums/ECrypto';
import { EFiat } from '../../../utils/enums/EFiat';
import { IExchangeRate } from '../../../utils/types/IExchangeRate';
import { Cleaning } from '../../../utils/utility/Cleaning';

interface IConversionDisplaySummary {
  exchangeRate: IExchangeRate | null;
  baseAmount: string;
  baseCurrency: EFiat | ECrypto;
  desiredAmount: string;
  desiredCurrency: EFiat | ECrypto;
  timeLeft: number;
  error: boolean;
}

/*
 * React component that displays summary of information for the current conversion.
 */
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
    error,
  } = props;
  const showSummary = !!baseAmount && !!desiredAmount;
  const SummaryInfo = getSummaryInfo(props);

  /*
   * State variables.
   */
  const [showExtra, setShowExtra] = useState(false);

  /*
   * Event handler to display the hidden info box.
   */
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
        <div className="min-h-[105px] sm:min-h-[85px] text-black flex flex-col rounded-b-lg">
          <div className="rounded-lg overflow-hidden">
            <button onClick={onCaretClick} className="w-full">
              <div className="pl-4 pr-2 pb-3 pt-3 bg-gray-100">
                {/* Summary Banner */}
                <div className="flex justify-between">
                  {!error ? (
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
                  ) : (
                    <p>No summary available for this conversion.</p>
                  )}
                  <Caret type={showExtra ? 'up' : 'down'} />
                </div>
              </div>
            </button>

            {/* Drawer */}
            <div className="flex h-full">
              <Expand type="vertical" in={showExtra}>
                <div className="w-full bg-gray-100">
                  <div className="pl-4 pr-2 pb-3 ">
                    <HorizontalRule className="pb-2" />
                    {SummaryInfo.map((item, i) => (
                      <div key={i} className="w-full flex justify-between">
                        {!error ? (
                          <>
                            <p>{item[0]}</p>
                            <p>{item[1]}</p>
                          </>
                        ) : (
                          <p>Data unavailable</p>
                        )}
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
    <span key={1} className="font-bold">
      Rate:
    </span>,
    `1 ${exchangeRate?.desired} = ${Cleaning.cleanStringAmount(
      (1 / (exchangeRate?.rate || Infinity)).toFixed(2).toString() || ''
    )} ${exchangeRate?.base}`,
  ],
];
