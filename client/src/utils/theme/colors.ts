import { IConversionDisplayColors } from '../types/IColors';
import { LIGHT_CONVERSION_DISPLAY_COLORS } from './colorThemes/lightColorTheme';

/*
 * Possible color theme types.
 */
enum EColorThemeType {
  LIGHT = 'light',
}

/*
 * Default color theme type.
 */
const DEFAULT_COLOR_THEME_TYPE: EColorThemeType = EColorThemeType.LIGHT;

/*
 * @Function: Gets a specific color theme from a color theme type.
 */
const getColorTheme = (
  colorTheme: EColorThemeType = DEFAULT_COLOR_THEME_TYPE
): IConversionDisplayColors => {
  switch (colorTheme) {
    case EColorThemeType.LIGHT:
      return LIGHT_CONVERSION_DISPLAY_COLORS;
    default:
      throw new Error(`Invalid colorTheme type passed: '${colorTheme}'`);
  }
};

/*
 * The color theme used throughout the entire app.
 */
export const COLOR_THEME: IConversionDisplayColors = {
  ...(getColorTheme() || LIGHT_CONVERSION_DISPLAY_COLORS), // In case getColorTheme throws an error, still have a backup
};
