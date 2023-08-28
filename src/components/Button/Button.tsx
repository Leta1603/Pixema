import React, { FC } from "react";
import classNames from "classnames";

import { ButtonProps } from "src/@types";

import styles from "./Button.module.scss";

const Button: FC<ButtonProps> = ({
  type,
  title,
  onClick,
  disabled,
  className,
}) => {
  const buttonStyle = styles[type];
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={classNames(
        buttonStyle,
        { [styles.disable]: disabled },
        className,
      )}
    >
      {title}
    </div>
  );
};

export default Button;
