import Image from 'next/image';
import React, { useState } from 'react';
import { Caret } from './Caret';
import { Expand } from '../animations/Expand';
import CLOSE_ICON_SRC from '../../assets/icons/white-close.png';

interface IDrawer {
  title: string;
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  onClickUpdateShowDrawer: React.MouseEventHandler<HTMLButtonElement>;
  onClickFn: (item?: any) => void;
  optionKeys: any[];
  optionMap?: any;
}

/*
 * React component that creates the "select dropdown" drawer.
 * Should only be used with through the useDrawer hook.
 * Provides the ability to search through options and update states when selected.
 */
export const Drawer: React.FC<IDrawer> = ({
  title,
  showDrawer,
  onClickUpdateShowDrawer,
  setShowDrawer,
  onClickFn,
  optionKeys,
  optionMap,
}) => {
  /*
   * State variables.
   */

  const [search, setSearch] = useState('');
  const [searchOptions, setSearchOptions] = useState(optionKeys);

  /*
   * Event handler for updating the state using the items in this dropdown.
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
          optionMap[item.toUpperCase()]
            ?.toLowerCase()
            ?.includes(value.toLowerCase()))
    );

    setSearch(value);
    setSearchOptions(_options);
  };

  return (
    <Expand in={showDrawer} padding>
      <div
        className={[
          'w-full h-full absolute bottom-0 right-0 z-10',
          'rounded-2xl px-10 py-10',
        ].join(' ')}
        style={{ backgroundColor: '#111111', color: 'white' }}
      >
        <div className="w-full h-full flex flex-col overflow-y-scroll hide-scroll-bar">
          {/* Title row */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl">{title}</h2>
            <button onClick={onClickUpdateShowDrawer} className="text-xl">
              <Image
                src={CLOSE_ICON_SRC}
                alt="close icon"
                width="24px"
                height="24px"
              />
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
              'bg-gray-100 text-black',
            ].join(' ')}
          />

          {/* List of Options */}
          <div className="w-full flex-grow relative">
            <div
              className={[
                'w-full h-full',
                'absolute top-0 right-0',
                'flex flex-col',
                'round-scroll-bar overflow-y-auto', // Show scrollbar here
              ].join(' ')}
            >
              {searchOptions.map((item, i) => (
                <button
                  key={i}
                  onClick={onClickUpdateState(item)}
                  className="w-full pt-2 pb-3 text-left flex justify-between items-center"
                >
                  <span className="w-full">
                    <span className="font-bold">{item}</span>{' '}
                    {optionMap && ` - ${optionMap[item]}`}
                  </span>
                  <Caret type="right" theme="light" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Expand>
  );
};
