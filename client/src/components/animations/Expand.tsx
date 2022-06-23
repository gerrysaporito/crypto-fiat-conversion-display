import { CSSTransition } from 'react-transition-group';

interface IExpand {
  in: boolean;
  type?: 'vertical' | 'horizontal';
  padding?: boolean;
  onChangeFn?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

/*
 * React animation component used to show an expanding sub-component.
 */
export const Expand: React.FC<IExpand> = (props) => {
  const { type = 'vertical', in: _in, onChangeFn, padding } = props;

  const className = [];

  switch (type) {
    case 'vertical': {
      className.push(`expand-vertical${padding ? '-padding' : ''}`);
      break;
    }
    case 'horizontal': {
      className.push(`expand-horizontal${padding ? '-padding' : ''}`);
      break;
    }
    default: {
      throw new Error(`Invalid type: '${type}'`);
    }
  }

  return (
    <CSSTransition
      in={_in}
      timeout={padding ? 700 : 500}
      onEnter={() => {
        if (onChangeFn) onChangeFn();
      }}
      onExit={() => {
        if (onChangeFn) onChangeFn();
      }}
      classNames={className.join(' ')}
      unmountOnExit
    >
      {props.children}
    </CSSTransition>
  );
};
