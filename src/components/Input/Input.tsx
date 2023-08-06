import React, { ChangeEvent, FC, forwardRef, LegacyRef } from "react";
import { InputProps } from "../../@types";

import styles from "./Input.module.scss";
import classNames from "classnames";

const Input = forwardRef<
  (HTMLInputElement | null) | (LegacyRef<HTMLTextAreaElement> | undefined),
  InputProps
>((props, ref) => {
  const {
    title,
    placeholder,
    errorText,
    value,
    onChange,
    isTextArea,
    onKeyDown,
    disabled,
    className,
  } = props;

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value);
  };

  const inputProps = {
    onChange: onInputChange,
    value,
    placeholder,
    className: classNames(styles.input, className,{
      [styles.errorInput]: errorText,
      [styles.disabled]: disabled,
      [styles.textarea]: isTextArea,
    }),
    onKeyDown,
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {isTextArea ? (
        <textarea
          ref={ref as LegacyRef<HTMLTextAreaElement> | null}
          {...inputProps}
        />
      ) : (
        <input
          ref={ref as LegacyRef<HTMLInputElement> | null}
          {...inputProps}
        />
      )}
      <div className={styles.errorText}>{errorText}</div>
    </div>
  );
});

export default Input;
