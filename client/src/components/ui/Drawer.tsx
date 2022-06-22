import React, { useState } from 'react';
import { Expand } from '../animations/Expand';
import { Caret } from './Caret';

interface IDrawer {
  title: string;
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  onClickUpdateShowDrawer: React.MouseEventHandler<HTMLButtonElement>;
  onClickFn: (item?: any) => void;
  optionKeys: any[];
  optionMap?: any;
}

export const Drawer: React.FC<IDrawer> = ({
  title,
  showDrawer,
  onClickUpdateShowDrawer,
  setShowDrawer,
  onClickFn,
  optionKeys,
  optionMap,
}) => {
  // if (!showDrawer) return <></>;
  const [search, setSearch] = useState('');
  const [searchOptions, setSearchOptions] = useState(optionKeys);

  /*
   * Event handler for updating the state for the items in this dropdown.
   */
  const onClickUpdateState =
    (item: any): React.MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      event.preventDefault();
      if (onClickFn) onClickFn(item);
      setShowDrawer(false);
    };

  /*
   * Event handler for updating the optionKeys of this dropdown given a search term.
   */
  const onClickUpdateSearch: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    event.preventDefault();
    const value = event.target.value;
    const _options = optionKeys.filter(
      (item: string) =>
        item.toLowerCase().includes(value.toLowerCase()) ||
        (optionMap &&
          item in optionMap &&
          optionMap[item.toLowerCase()]
            .toLowerCase()
            .includes(value.toLowerCase()))
    );

    setSearch(value);
    setSearchOptions(_options);
  };

  return (
    <Expand in={showDrawer}>
      <div
        className={[
          'w-full h-full absolute bottom-0 right-0',
          'rounded-2xl px-10 py-10',
        ].join(' ')}
        style={{ backgroundColor: 'lightblue' }}
      >
        <div className="w-full h-full flex flex-col overflow-y-scroll hide-scroll-bar">
          {/* Title row */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl">{title}</h2>
            <button onClick={onClickUpdateShowDrawer} className="text-xl">
              x
            </button>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            onChange={onClickUpdateSearch}
            value={search}
            className={[
              'w-full',
              'px-4 py-2 my-4 rounded-lg',
              'bg-gray-100',
            ].join(' ')}
          />

          {/* List of Options */}
          <div className="w-full flex-grow relative">
            <div
              className={[
                'w-full h-full',
                'absolute top-0 right-0',
                'flex flex-col',
                'overflow-y-auto round-scroll-bar',
              ].join(' ')}
            >
              {searchOptions.map((item, i) => (
                <button
                  key={i}
                  onClick={onClickUpdateState(item)}
                  className="w-full pt-2 pb-3 text-left flex justify-between"
                >
                  <span>
                    <span className="font-bold">{item}</span>{' '}
                    {optionMap && ` - ${optionMap[item]}`}
                  </span>
                  <Caret type="right" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Expand>
  );
};
