import React, { FC } from "react";

import ThemeContext from "./Context";
import { Children, Theme } from "src/@types";

type ThemeProviderProps = {
  children: Children;
  themeValue: Theme;
  onChangeTheme: (value: Theme) => () => void;
};
const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  themeValue,
  onChangeTheme,
}) => {
  return (
    <ThemeContext.Provider
      value={{
        themeValue,
        onChangeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
