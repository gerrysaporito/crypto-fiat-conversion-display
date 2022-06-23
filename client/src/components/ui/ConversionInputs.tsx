import { Caret } from './Caret';
import { useDrawer } from '../../hooks/useDrawer';
import { ECrypto, Crypto } from '../../utils/enums/ECrypto';
import { EFiat, Fiat } from '../../utils/enums/EFiat';
import { Conversion } from '../../utils/utility/Conversion';

interface ConversionInput {
  description: string;
  drawerTitle: string;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  selectedCurrency: keyof typeof EFiat | keyof typeof ECrypto;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<EFiat | ECrypto>>;
  lastUpdated: 'baseAmount' | 'desiredAmount';
  setLastUpdated: React.Dispatch<
    React.SetStateAction<'baseAmount' | 'desiredAmount'>
  >;
}

/*
 * A single input row on the conversion display.
 * Uses the useDrawer hook to display dropdown options for a specific state.
 */
export const ConversionInput: React.FC<ConversionInput> = ({
  description,
  drawerTitle,
  amount,
  setAmount,
  selectedCurrency,
  setSelectedCurrency,
  setLastUpdated,
  lastUpdated,
}) => {
  const placeholderAmount = Conversion.isFiat(selectedCurrency) ? '100' : '0.1';
  const currencies = Object.keys(
    Conversion.isFiat(selectedCurrency) ? EFiat : ECrypto
  );

  /*
   * Drawer with options for dropdown.
   */
  const { drawer, onClickUpdateShowDrawer } = useDrawer<EFiat | ECrypto>({
    title: drawerTitle,
    onClickFn: (item: EFiat | ECrypto) => {
      setLastUpdated(lastUpdated);
      setSelectedCurrency(item);
    },
    optionKeys: currencies as unknown as (EFiat | ECrypto)[],
    optionMap: { ...Fiat, ...Crypto },
  });

  /*
   * Event handler to update monetary amount displayed to the user.
   */
  const onChangeUpdateAmount: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    event.preventDefault();
    event.persist();
    let value = event.target.value;
    const decimals = value.split('.')[1];

    if (Conversion.isFiat(selectedCurrency) && decimals?.length > 2) return;
    if (Conversion.isCrypto(selectedCurrency) && decimals?.length > 5) return;

    setLastUpdated(lastUpdated);
    setAmount(value);
  };

  return (
    <>
      <div className="w-full">
        <label htmlFor={selectedCurrency}>{description}</label>
        <div className="w-full grid grid-cols-7 pt-2 text-base">
          <input
            name={selectedCurrency}
            type="number"
            onChange={onChangeUpdateAmount}
            value={amount}
            placeholder={placeholderAmount}
            className={[
              'w-full col-span-5',
              'px-4 py-2 rounded-l-lg',
              'bg-gray-100 text-black',
              'text-sm sm:text-base',
            ].join(' ')}
          />
          <button
            onClick={onClickUpdateShowDrawer}
            className={[
              'w-full col-span-2 flex justify-between items-center',
              'rounded-r-lg pl-4 pr-2 pt-2 pb-2',
              'bg-[#EDEDEF] text-black',
              'text-sm sm:text-base',
            ].join(' ')}
          >
            {selectedCurrency}
            <span className="h-full flex items-center">
              <Caret type="down" />
            </span>
          </button>
        </div>
      </div>
      {drawer}
    </>
  );
};
