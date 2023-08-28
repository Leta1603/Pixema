import React, { FC } from "react";

import {Theme, TitleProps} from "src/@types";

import styles from "./Title.module.scss";
import {useThemeContext} from "src/context/Theme";
import classNames from "classnames";

const Title: FC<TitleProps> = ({ title }) => {
  const { themeValue } = useThemeContext();
  return <div className={classNames(styles.title, {
    [styles.lightTitle]: themeValue === Theme.Light,
  })}>{title}</div>;
};

export default Title;
