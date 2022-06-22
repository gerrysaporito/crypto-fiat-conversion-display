import axios from 'axios';
import { useState } from 'react';
import { Drawer } from '../components/ui/Drawer';
import { IError } from '../utils/types/IError';

interface IDrawer<T> {
  title: string;
  setState: React.Dispatch<React.SetStateAction<T>>;
  optionKeys: T[];
  optionMap?: { [key: string]: string };
}

export function useDrawer<T>({
  title,
  setState,
  optionKeys,
  optionMap,
}: IDrawer<T>) {
  const [showDrawer, setShowDrawer] = useState(false);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setShowDrawer((prev) => !prev);
  };
  const drawer = (
    <Drawer
      title={title}
      showDrawer={showDrawer}
      onClickUpdateShowDrawer={onClick}
      setShowDrawer={setShowDrawer}
      optionKeys={optionKeys}
      optionMap={optionMap}
      setState={setState}
    />
  );

  return {
    onClickUpdateShowDrawer: onClick,
    drawer,
  };
}
