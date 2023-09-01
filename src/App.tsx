import React from "react";

import Router from "src/components/Router";
import { useDispatch, useSelector } from "react-redux";
import { setThemeValue, ThemeSelectors } from "src/redux/reducers/themeSlice";
import { ThemeProvider } from "src/context/Theme";
import { Theme } from "src/@types";
import { THEME } from "src/utils/constants";

const App = () => {
  const dispatch = useDispatch();

  const themeValue = useSelector(ThemeSelectors.getThemeValue);
  // localStorage.setItem(THEME, JSON.stringify(themeValue));
  const onChangeTheme = (value: Theme) => () => {
    dispatch(setThemeValue(value));
  };

  return (
    <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
