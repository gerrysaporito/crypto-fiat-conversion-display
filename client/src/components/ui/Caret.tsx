import Image, { StaticImageData } from 'next/image';

/*
 * Loaded caret images.
 */
import DARK_DOWN_CARET_SRC from '../../assets/icons/black-chevron-down.png';
import DARK_UP_CARET_SRC from '../../assets/icons/black-chevron-up.png';
import DARK_RIGHT_CARET_SRC from '../../assets/icons/black-chevron-right.png';
import DARK_LEFT_CARET_SRC from '../../assets/icons/black-chevron-left.png';
import LIGHT_DOWN_CARET_SRC from '../../assets/icons/white-chevron-down.png';
import LIGHT_UP_CARET_SRC from '../../assets/icons/white-chevron-up.png';
import LIGHT_RIGHT_CARET_SRC from '../../assets/icons/white-chevron-right.png';
import LIGHT_LEFT_CARET_SRC from '../../assets/icons/white-chevron-left.png';

interface ICaret {
  type: 'up' | 'down' | 'right' | 'left';
  theme?: 'dark' | 'light';
  width?: number;
  height?: number;
  className?: string;
}

/*
 * React component to display an image of a caret/chevron (arrow).
 * Used as an icon.
 */
export const Caret: React.FC<ICaret> = ({
  type,
  width,
  height,
  theme = 'dark',
  className,
}) => {
  let src: StaticImageData | null = null;

  /*
   * "Sieve" (fine-mesh strainer) to select the appropriate image.
   */
  switch (type) {
    case 'up': {
      if (theme === 'dark') src = DARK_UP_CARET_SRC;
      else src = LIGHT_UP_CARET_SRC;
      break;
    }
    case 'down': {
      if (theme === 'dark') src = DARK_DOWN_CARET_SRC;
      else src = LIGHT_DOWN_CARET_SRC;
      break;
    }
    case 'right': {
      if (theme === 'dark') src = DARK_RIGHT_CARET_SRC;
      else src = LIGHT_RIGHT_CARET_SRC;
      break;
    }
    case 'left': {
      if (theme === 'dark') src = DARK_LEFT_CARET_SRC;
      else src = LIGHT_LEFT_CARET_SRC;
      break;
    }
    default: {
      throw new Error(`Invalid type passed to caret: '${type}'`);
    }
  }

  return (
    <span className={`w-5 h-4 flex justify-center items-center ${className}`}>
      <Image
        src={src}
        alt={`Caret ${type} icon.`}
        width={`${width || '14'}px`}
        height={`${height || '14'}px`}
      />
    </span>
  );
};
