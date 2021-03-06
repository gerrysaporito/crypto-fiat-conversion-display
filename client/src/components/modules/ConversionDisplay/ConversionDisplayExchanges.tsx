import { Caret } from '../../ui/Caret';
import { useDrawer } from '../../../hooks/useDrawer';
import { EExchange } from '../../../utils/enums/EExchange';

interface IConversionDisplayExchanges {
  selectedExchange: EExchange;
  setExchange: React.Dispatch<React.SetStateAction<EExchange>>;
}

/*
 * React component that displays and handles the exchange information.
 * Displays Exchange and contains button to open up exchange drawer.
 */
export const ConversionDisplayExchanges: React.FC<
  IConversionDisplayExchanges
> = ({ selectedExchange, setExchange }) => {
  const exchanges = Object.keys(EExchange).map((item) => item.toUpperCase());

  /*
   * Drawer with list of exchanges as dropdown options.
   */
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
        <h2 className="text-xl sm:text-2xl font-semibold flex items-between">
          Quotes from{' '}
          {EExchange[selectedExchange.toUpperCase() as keyof typeof EExchange]}{' '}
          <Caret
            type="down"
            theme="light"
            width={30}
            height={30}
            className="mt-[7px] sm:mt-[10px] ml-2"
          />
        </h2>
      </button>
      {drawer}
    </div>
  );
};
