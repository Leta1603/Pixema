import React, { FC } from "react";
import classNames from "classnames";

import { TabProps } from "src/@types";

import styles from "./Tab.module.scss";

const Tab: FC<TabProps> = ({ title, onClick, active }) => {
  return (
    <div
      onClick={onClick}
      className={classNames(styles.tab, { [styles.active]: active })}
    >
      {title}
    </div>
  );
};

export default Tab;
