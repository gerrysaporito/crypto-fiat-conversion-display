import { useDrawer } from '../../../hooks/useDrawer';
import { EExchange } from '../../../utils/enums/EExchange';

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
    setState: setExchange,
    optionKeys: exchanges as EExchange[],
    // optionMap: EExchange,
  });

  return (
    <div className="w-full overflow-x-scroll hide-scroll-bar">
      <button onClick={onClickUpdateShowDrawer}>{selectedExchange}</button>
      {drawer}
    </div>
  );
};
