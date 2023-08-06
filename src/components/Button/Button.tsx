import React, { FC } from "react";
import classNames from "classnames";

import { ButtonProps } from "../../@types";

import styles from "./Button.module.scss";

const Button: FC<ButtonProps> = ({ type, title, onClick, disabled }) => {
  const buttonStyle = styles[type];
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={classNames(buttonStyle, { [styles.disable]: disabled })}
    >
      {title}
    </div>
  );
};

export default Button;
