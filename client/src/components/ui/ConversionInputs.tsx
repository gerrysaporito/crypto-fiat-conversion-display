import { ECrypto } from '../../utils/enums/ECrypto';
import { EFiat } from '../../utils/enums/EFiat';
import { Conversion } from '../../utils/utility/Conversion';

/*
 * A single input row on the conversion display
 */
interface ConversionInput {
  header: string;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  selectedCurrency: keyof typeof EFiat | keyof typeof ECrypto;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<EFiat | ECrypto>>;
  lastUpdated: 'baseAmount' | 'desiredAmount';
  setLastUpdated: React.Dispatch<
    React.SetStateAction<'baseAmount' | 'desiredAmount'>
  >;
}
export const ConversionInput: React.FC<ConversionInput> = ({
  header,
  amount,
  setAmount,
  selectedCurrency,
  setSelectedCurrency,
  setLastUpdated,
  lastUpdated,
}) => {
  const currencies = Conversion.isFiat(selectedCurrency) ? EFiat : ECrypto;
  const placeholderAmount = Conversion.isFiat(selectedCurrency) ? '100' : '0.1';
  /*
   * React element for each option within the select.
   */
  const options = Object.keys(currencies).map((item, i) => (
    <option key={i} value={item}>
      {currencies[item as keyof typeof currencies]}
    </option>
  ));

  /*
   * Event handler to update monetary amount to show.
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

  /*
   * Event handler to update the currency to show.
   */
  const onChangeUpdateCurrency: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    event.preventDefault();
    event.persist();
    const value = event.target.value as EFiat | ECrypto;

    setLastUpdated(lastUpdated);
    setSelectedCurrency(value);
  };

  return (
    <div className="w-full py-2">
      <label htmlFor={selectedCurrency}>{header}</label>
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
            'bg-gray-100',
          ].join(' ')}
        />
        <select
          onChange={onChangeUpdateCurrency}
          value={selectedCurrency}
          className={[
            'w-full col-span-2',
            'rounded-r-lg px-2 py-2',
            'bg-[#EDEDEF]',
          ].join(' ')}
        >
          {options}
        </select>
      </div>
    </div>
  );
};
