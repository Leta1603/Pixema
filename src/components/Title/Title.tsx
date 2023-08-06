import React, { FC } from "react";

import { TitleProps } from "../../@types";

import styles from "./Title.module.scss";

const Title: FC<TitleProps> = ({ title }) => {
  return <div className={styles.title}>{title}</div>;
};

export default Title;
