import { useDrawer } from '../../../hooks/useDrawer';
import { EExchange } from '../../../utils/enums/EExchange';
import { Caret } from '../../ui/Caret';

interface IConversionDisplayExchanges {
  selectedExchange: EExchange;
  setExchange: React.Dispatch<React.SetStateAction<EExchange>>;
}

export const ConversionDisplayExchanges: React.FC<
  IConversionDisplayExchanges
> = ({ selectedExchange, setExchange }) => {
  const exchanges = Object.keys(EExchange).map((item) => item.toUpperCase());

  const { drawer, onClickUpdateShowDrawer } = useDrawer<EExchange>({
    title: 'Select an exchange',
    onClickFn: (item: EExchange) => {
      setExchange(item);
    },
    optionKeys: exchanges as EExchange[],
  });

  return (
    <div className="w-full overflow-x-scroll hide-scroll-bar">
      <button onClick={onClickUpdateShowDrawer}>
        <h2 className="text-2xl font-semibold flex items-between">
          Quotes from {EExchange[selectedExchange as keyof typeof EExchange]}{' '}
          <Caret type="down" width={30} className="mt-1" />
        </h2>
      </button>
      {drawer}
    </div>
  );
};
