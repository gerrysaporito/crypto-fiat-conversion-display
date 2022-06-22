const DOWN_CARET_SRC = 'https://www.svgrepo.com/show/315098/caret-down.svg';
const UP_CARET_SRC = 'https://www.svgrepo.com/show/315106/caret-up.svg';
const RIGHT_CARET_SRC = 'https://www.svgrepo.com/show/315104/caret-right.svg';
const LEFT_CARET_SRC = 'https://www.svgrepo.com/show/315101/caret-left.svg';

interface ICaret {
  type: 'up' | 'down' | 'right' | 'left';
  width?: number;
  height?: number;
  className?: string;
}
export const Caret: React.FC<ICaret> = ({ type, width, height, className }) => {
  let src = '';

  switch (type) {
    case 'up': {
      src = UP_CARET_SRC;
      break;
    }
    case 'down': {
      src = DOWN_CARET_SRC;
      break;
    }
    case 'right': {
      src = RIGHT_CARET_SRC;
      break;
    }
    case 'left': {
      src = LEFT_CARET_SRC;
      break;
    }
    default: {
      throw new Error(`Invalid type passed to caret: '${type}'`);
    }
  }

  return (
    <img
      src={src}
      alt={`Caret ${type} icon.`}
      width={`${width || '22'}px`}
      height={`${height || '22'}px`}
      className={className}
    />
  );
};
