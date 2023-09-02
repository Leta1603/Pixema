import React, { FC } from "react";
import {LinksProps} from "src/@types";

import styles from "./Links.module.scss";
import classNames from "classnames";

const Links: FC<LinksProps> = ({ title, children, onClick, disabled, className }) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.disabled]: disabled,
      }, className)}
      onClick={onClick}
    >
      <div className={styles.label}>{children}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default Links;
