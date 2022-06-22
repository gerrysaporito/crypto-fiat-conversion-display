import Image from 'next/image';

const DOWN_CARET_SRC =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caret_down_font_awesome.svg/512px-Caret_down_font_awesome.svg.png?20130126203221';
const UP_CARET_SRC =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Caret_up_font_awesome.svg/512px-Caret_up_font_awesome.svg.png?20130126203252';

interface ICaret {
  type: 'up' | 'down';
  width?: number;
  height?: number;
}
export const Caret: React.FC<ICaret> = ({ type, width, height }) => {
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
    default: {
      throw new Error(`Invalid type passed to caret: '${type}'`);
    }
  }

  return (
    <Image
      src={src}
      alt={`Caret ${type}`}
      width={`${width || '16'}px`}
      height={`${height || '16'}px`}
    />
  );
};
