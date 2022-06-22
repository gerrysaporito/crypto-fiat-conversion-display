import Image from 'next/image';
import React, { useState } from 'react';
import { ECrypto } from '../../../utils/enums/ECrypto';
import { EFiat } from '../../../utils/enums/EFiat';
import { IExchangeRate } from '../../../utils/types/IExchangeRate';
import { Cleaning } from '../../../utils/utility/Cleaning';
import { HorizontalRule } from '../../ui/HorizontalRule';

const DOWN_CARET_SRC =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caret_down_font_awesome.svg/512px-Caret_down_font_awesome.svg.png?20130126203221';
const UP_CARET_SRC =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Caret_up_font_awesome.svg/512px-Caret_up_font_awesome.svg.png?20130126203252';

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
  const [showExtra, setShowExtra] = useState(true);
  const showSummary = !!baseAmount && !!desiredAmount;
  const SummaryInfo = getSummaryInfo(props);

  return (
    <div className="flex flex-col">
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
        <div className="rounded-lg bg-gray-100 px-4 pb-2 pt-3">
          <SummaryBanner
            setShowExtra={setShowExtra}
            showExtra={showExtra}
            {...props}
          />
          {showExtra && (
            <div>
              <HorizontalRule className="my-1" />
              {SummaryInfo.map((item, i) => (
                <div className="flex justify-between">
                  <p>{item[0]}</p>
                  <p>{item[1]}</p>
                </div>
              ))}
            </div>
          )}
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

interface ISummaryBanner {
  baseAmount: string;
  baseCurrency: EFiat | ECrypto;
  desiredAmount: string;
  desiredCurrency: EFiat | ECrypto;
  setShowExtra: React.Dispatch<React.SetStateAction<boolean>>;
  showExtra: boolean;
}
const SummaryBanner: React.FC<ISummaryBanner> = ({
  baseAmount,
  baseCurrency,
  desiredAmount,
  desiredCurrency,
  setShowExtra,
  showExtra,
}) => {
  const onCaretClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault;
    setShowExtra((prev) => !prev);
  };

  return (
    <div className="flex justify-between">
      <p>
        You get{' '}
        <span className="font-bold tabular-nums">
          {Cleaning.cleanStringAmount(desiredAmount)} {desiredCurrency}
        </span>{' '}
        for{' '}
        <span className="font-bold tabular-nums">
          {Cleaning.cleanStringAmount(baseAmount)} {baseCurrency}
        </span>
      </p>
      <button onClick={onCaretClick}>
        <Image
          src={showExtra ? UP_CARET_SRC : DOWN_CARET_SRC}
          width="20px"
          height="20px"
        />
      </button>
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
    'Rate:',
    `1 ${exchangeRate?.desired} = $${Cleaning.cleanStringAmount(
      (1 / (exchangeRate?.rate || Infinity)).toFixed(2).toString() || ''
    )} ${exchangeRate?.base}`,
  ],
];
