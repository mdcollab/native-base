import connectStyle, { clearThemeCache } from "./src/connectStyle";
import { INCLUDE } from "./src/resolveIncludes";
import StyleProvider, { ThemeContext, ThemeConsumer, useTheme } from "./src/StyleProvider";
import Theme, { ThemeShape } from "./src/Theme";
import { createVariations, createSharedStyle } from "./src/addons";

export {
  connectStyle,
  clearThemeCache,
  INCLUDE,
  StyleProvider,
  ThemeContext,
  ThemeConsumer,
  useTheme,
  Theme,
  ThemeShape,
  createVariations,
  createSharedStyle
};
