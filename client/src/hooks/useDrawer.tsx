import { useState } from 'react';
import { Drawer } from '../components/ui/Drawer';

interface IDrawer<T> {
  title: string;
  onClickFn: (item?: any) => void;
  optionKeys: T[];
  optionMap?: { [key: string]: string };
}

/*
 * Hook which is used to standardize the creation of the expandable drawer.
 * Can be used in any component within the module.
 * Also provides a button event handler to update the visibility state of the drawer.
 */
export function useDrawer<T>({
  title,
  onClickFn,
  optionKeys,
  optionMap,
}: IDrawer<T>) {
  /*
   * State variables.
   */
  const [showDrawer, setShowDrawer] = useState(false);

  /*
   * Event handler to set state of the drawer's visibility.
   */
  const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setShowDrawer((prev) => !prev);
  };

  /*
   * Drawer component.
   */
  const drawer = (
    <Drawer
      title={title}
      showDrawer={showDrawer}
      onClickUpdateShowDrawer={onClick}
      setShowDrawer={setShowDrawer}
      optionKeys={optionKeys}
      optionMap={optionMap}
      onClickFn={onClickFn}
    />
  );

  return {
    onClickUpdateShowDrawer: onClick,
    drawer,
  };
}
