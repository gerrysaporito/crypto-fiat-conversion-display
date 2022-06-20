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
}) => {
  return (
    <div className="w-full">
      <Input
        header="I want to spend"
        amount={baseAmount}
        setAmount={setBaseAmount}
        selectedCurrency={baseCurrency}
        setSelectedCurrency={setBaseCurrency}
      />
      <Input
        header="I will recieve"
        amount={desiredAmount}
        setAmount={setDesiredAmount}
        selectedCurrency={desiredCurrency}
        setSelectedCurrency={setDesiredCurrency}
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
}
const Input: React.FC<IInput> = ({
  header,
  amount,
  setAmount,
  selectedCurrency,
  setSelectedCurrency,
}) => {
  const currencies = Conversion.isFiat(selectedCurrency) ? EFiat : ECrypto;

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
    const value = event.target.value;

    if (value.split('.')[1]?.length > 2) return;
    setAmount(value);
  };

  /*
   * Event handler to update the currency to show.
   */
  const onChangeUpdateCurrency: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    event.preventDefault();
    const value = event.target.value as EFiat | ECrypto;
    setSelectedCurrency(value);
  };

  return (
    <div className="w-full h-12">
      <p>{header}</p>
      <div>
        <input type="number" onChange={onChangeUpdateAmount} value={amount} />
        <select onChange={onChangeUpdateCurrency} value={selectedCurrency}>
          {options}
        </select>
      </div>
    </div>
  );
};
