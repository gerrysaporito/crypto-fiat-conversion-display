import React from 'react';

interface IDrawer {
  title: string;
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  onClickUpdateShowDrawer: React.MouseEventHandler<HTMLButtonElement>;
  options: any[];
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export const Drawer: React.FC<IDrawer> = ({
  title,
  showDrawer,
  onClickUpdateShowDrawer,
  setShowDrawer,
  options,
  setState,
}) => {
  if (!showDrawer) return <></>;

  /*
   * Event handler for updating the value of this dropdown.
   */
  const onClickUpdateState =
    (item: any): React.MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      event.preventDefault();
      setState(item);
      setShowDrawer(false);
    };

  return (
    <div
      className={[
        'w-full h-full absolute top-0 right-0',
        'rounded-2xl px-10 py-10',
      ].join(' ')}
      style={{ backgroundColor: 'lightblue' }}
    >
      <div className="w-full relative">
        {/* Title row */}
        <div className="flex justify-between items-center pb-10">
          <h2 className="text-xl">{title}</h2>
          <button onClick={onClickUpdateShowDrawer} className="text-xl">
            x
          </button>
        </div>

        {/* Search Row */}

        {/* List of Options */}
        <div className={['w-full relative', 'grid grid-cols-1'].join(' ')}>
          {options.map((item, i) => (
            <button
              key={i}
              onClick={onClickUpdateState(item)}
              className="w-full pt-2 pb-3"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
