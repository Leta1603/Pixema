import React from "react";
import classNames from "classnames";

import styles from "./ThemeSwitcher.module.scss";
import { MoonIcon, SunIcon } from "src/assets/icons";
import { Theme } from "src/@types";
import { useThemeContext } from "src/context/Theme";

const ThemeSwitcher = () => {
  const { themeValue, onChangeTheme } = useThemeContext();
  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.button, {
          [styles.activeButton]: themeValue === Theme.Dark,

          [styles.notActiveButton]: themeValue === Theme.Light,
        })}
        onClick={onChangeTheme(Theme.Dark)}
      >
        <MoonIcon />
      </div>
      <div
        className={classNames(styles.button, {
          [styles.activeButton]: themeValue === Theme.Light,
        })}
        onClick={onChangeTheme(Theme.Light)}
      >
        <SunIcon />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
