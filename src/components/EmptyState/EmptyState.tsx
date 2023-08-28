import React, { FC } from "react";
import { EmptyListIcon } from "src/assets/icons";
import styles from "./EmptyState.module.scss";
import classNames from "classnames";

type EmptyStatePropsType = {
  title: string;
};
const EmptyState: FC<EmptyStatePropsType> = ({ title }) => {
  return (
    <div className={classNames(styles.container)}>
      <EmptyListIcon />
      <div className={styles.infoContainer}>{title}</div>
    </div>
  );
};

export default EmptyState;
