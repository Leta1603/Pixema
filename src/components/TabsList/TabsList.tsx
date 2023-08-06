import React, { FC } from "react";
import { TabsListProps } from "../../@types";
import Tab from "../Tab";

import styles from "./TabsList.module.scss";

const TabsList: FC<TabsListProps> = ({ tabsList, activeTab, onClick }) => {
  return (
    <div className={styles.container}>
      {tabsList.map(({ key, title }) => (
        <Tab
          key={key}
          title={title}
          onClick={onClick(key)}
          active={activeTab === key}
        />
      ))}
    </div>
  );
};

export default TabsList;
