import { ECrypto } from '../../../utils/enums/ECrypto';
import { EFiat } from '../../../utils/enums/EFiat';
import { Conversion } from '../../../utils/utility/Conversion';

interface IConversionDisplayInputs {
  baseCurrency: EFiat | ECrypto;
  setBaseCurrency: React.Dispatch<React.SetStateAction<EFiat | ECrypto>>;
  baseAmount: string;
  setBaseAmount: React.Dispatch<React.SetStateAction<string>>;
  desiredCurrency: EFiat | ECrypto;
  setDesiredCurrency: React.Dispatch<React.SetStateAction<EFiat | ECrypto>>;
  desiredAmount: string;
  setDesiredAmount: React.Dispatch<React.SetStateAction<string>>;
  setLastUpdated: React.Dispatch<
    React.SetStateAction<'baseAmount' | 'desiredAmount'>
  >;
}
export const ConversionDisplayInputs: React.FC<IConversionDisplayInputs> = ({
  baseCurrency,
  setBaseCurrency,
  baseAmount,
  setBaseAmount,
  desiredCurrency,
  setDesiredCurrency,
  desiredAmount,
  setDesiredAmount,
  setLastUpdated,
}) => {
  return (
    <div className="w-full">
      <Input
        header="I want to spend"
        amount={baseAmount}
        setAmount={setBaseAmount}
        selectedCurrency={baseCurrency}
        setSelectedCurrency={setBaseCurrency}
        lastUpdated="baseAmount"
        setLastUpdated={setLastUpdated}
      />
      <Input
        header="I want to buy"
        amount={desiredAmount}
        setAmount={setDesiredAmount}
        selectedCurrency={desiredCurrency}
        setSelectedCurrency={setDesiredCurrency}
        lastUpdated="desiredAmount"
        setLastUpdated={setLastUpdated}
      />
    </div>
  );
};

/*
 * A single input row on the conversion display
 */
interface IInput {
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
const Input: React.FC<IInput> = ({
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
    const run = async () => {
      event.preventDefault();
      const value = event.target.value;
      const decimals = value.split('.')[1];
      if (Conversion.isFiat(selectedCurrency) && decimals?.length > 2) return;
      if (Conversion.isCrypto(selectedCurrency) && decimals?.length > 5) return;

      await setLastUpdated(lastUpdated);
      await setAmount(value.trim());
    };
    run();
  };

  /*
   * Event handler to update the currency to show.
   */
  const onChangeUpdateCurrency: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const run = async () => {
      event.preventDefault();
      const value = event.target.value as EFiat | ECrypto;

      await setLastUpdated(lastUpdated);
      await setSelectedCurrency(value);
    };
    run();
  };

  return (
    <div className="w-full h-12">
      <p>{header}</p>
      <div>
        <input
          type="number"
          onChange={onChangeUpdateAmount}
          value={amount}
          placeholder={placeholderAmount}
        />
        <select onChange={onChangeUpdateCurrency} value={selectedCurrency}>
          {options}
        </select>
      </div>
    </div>
  );
};
