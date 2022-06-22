import { ECrypto } from '../../../utils/enums/ECrypto';
import { EFiat } from '../../../utils/enums/EFiat';
import { Conversion } from '../../../utils/utility/Conversion';
import { ConversionInput } from '../../ui/ConversionInputs';

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
      <ConversionInput
        header="I want to spend"
        amount={baseAmount}
        setAmount={setBaseAmount}
        selectedCurrency={baseCurrency}
        setSelectedCurrency={setBaseCurrency}
        lastUpdated="baseAmount"
        setLastUpdated={setLastUpdated}
      />
      <ConversionInput
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
