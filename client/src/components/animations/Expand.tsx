import { CSSTransition } from 'react-transition-group';

interface IExpand {
  in: boolean;
  type?: 'vertical' | 'horizontal';
  onChangeFn?: () => void;
  children: React.ReactNode | React.ReactNode[];
}
export const Expand: React.FC<IExpand> = (props) => {
  const { type = 'vertical', in: _in, onChangeFn } = props;

  const classNames = [];

  switch (type) {
    case 'vertical': {
      classNames.push('expand-vertical');
      break;
    }
    case 'horizontal': {
      classNames.push('expand-horizontal');
      break;
    }
    default: {
      throw new Error(`Invalid type: '${type}'`);
    }
  }

  return (
    <CSSTransition
      in={_in}
      timeout={1000}
      onEnter={() => {
        if (onChangeFn) onChangeFn();
      }}
      onExit={() => {
        if (onChangeFn) onChangeFn();
      }}
      classNames={classNames.join(' ')}
      unmountOnExit
    >
      {props.children}
    </CSSTransition>
  );
};
