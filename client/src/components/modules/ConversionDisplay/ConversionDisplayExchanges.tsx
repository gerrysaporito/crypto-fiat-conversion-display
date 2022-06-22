import { EExchange } from '../../../utils/enums/EExchange';

interface IConversionDisplayExchanges {
  selectedExchange: EExchange;
  setExchange: React.Dispatch<React.SetStateAction<EExchange>>;
}

export const ConversionDisplayExchanges: React.FC<
  IConversionDisplayExchanges
> = ({ selectedExchange, setExchange }) => {
  const exchanges = Object.keys(EExchange).map((item) => item.toUpperCase());

  /*
   * Event handler for selecting new exchanges
   */
  const onClickUpdateExchange =
    (value: EExchange): React.MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      event.preventDefault();
      if (exchanges.includes(value.toUpperCase()))
        setExchange(EExchange[value as keyof typeof EExchange]);
    };

  /*
   * Exchange items
   */
  const _exchanges = exchanges.map((key, i) => {
    const active =
      selectedExchange === EExchange[key as keyof typeof EExchange];
    return (
      <button
        key={i}
        onClick={onClickUpdateExchange(key as EExchange)}
        className={[
          'px-6 py-3',
          `font-semibold text-lg ${active ? 'text-sky-900' : 'text-slate-500'}`,
        ].join(' ')}
      >
        {key}
      </button>
    );
  });

  return (
    <div className="w-full overflow-x-scroll hide-scroll-bar">{_exchanges}</div>
  );
};
