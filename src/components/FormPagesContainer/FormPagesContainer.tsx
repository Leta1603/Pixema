import React, { FC, ReactElement, KeyboardEvent } from "react";
import { ButtonTypes, Children, Theme } from "src/@types";

import styles from "./FormPagesContainer.module.scss";
import Title from "src/components/Title";
import Button from "src/components/Button";
import classNames from "classnames";
import { useThemeContext } from "src/context/Theme";

type FormPagesContainerProps = {
  title: string;
  children: Children;
  btnTitle: string;
  onSubmit: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  additionalInfo?: ReactElement;
  isSubmitDisabled?: boolean;
  className?: string;
};
const FormPagesContainer: FC<FormPagesContainerProps> = ({
  title,
  children,
  btnTitle,
  onSubmit,
  onKeyDown,
  additionalInfo,
  isSubmitDisabled,
  className,
}) => {
  const { themeValue } = useThemeContext();
  return (
    <div
      className={classNames(styles.container, {
        [styles.lightContainer]: themeValue === Theme.Light,
      })}
      onKeyDown={onKeyDown}
    >
      <Title title={title} />
      <div className={styles.formContainer}>
        <div className={classNames(styles.fieldsContainer, className)}>
          {children}
        </div>
        <Button
          type={ButtonTypes.Primary}
          title={btnTitle}
          onClick={onSubmit}
          className={styles.button}
          disabled={isSubmitDisabled}
        />
        <div>{additionalInfo}</div>
      </div>
    </div>
  );
};

export default FormPagesContainer;
