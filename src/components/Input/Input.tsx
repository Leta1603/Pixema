import React, { ChangeEvent, forwardRef, LegacyRef } from "react";
import { InputProps, Theme } from "src/@types";

import styles from "./Input.module.scss";
import classNames from "classnames";
import { useThemeContext } from "src/context/Theme";

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
    type,
  } = props;

  const { themeValue } = useThemeContext();

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value);
  };

  const inputProps = {
    onChange: onInputChange,
    value,
    placeholder,
    className: classNames(styles.input, className, {
      [styles.errorInput]: errorText,
      [styles.disabled]: disabled,
      [styles.textarea]: isTextArea,
      [styles.lightInput]: themeValue === Theme.Light,
    }),
    onKeyDown,
  };

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.title, {
          [styles.lightTitle]: themeValue === Theme.Light,
        })}
      >
        {title}
      </div>
      {isTextArea ? (
        <textarea
          ref={ref as LegacyRef<HTMLTextAreaElement> | null}
          {...inputProps}
        />
      ) : (
        <input
          ref={ref as LegacyRef<HTMLInputElement> | null}
          type={type}
          {...inputProps}
        />
      )}
      <div className={styles.errorText}>{errorText}</div>
    </div>
  );
});

export default Input;
