import axios from 'axios';
import { useState } from 'react';
import { Drawer } from '../components/ui/Drawer';
import { IError } from '../utils/types/IError';

interface IDrawer<T> {
  title: string;
  options: T[];
  setState: React.Dispatch<React.SetStateAction<T>>;
}

export function useDrawer<T>({ title, options, setState }: IDrawer<T>) {
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
      options={options}
      setState={setState}
    />
  );

  return {
    onClickUpdateShowDrawer: onClick,
    drawer,
  };
}
