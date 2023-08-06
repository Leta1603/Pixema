import React from "react";
import Search from "../Search";
import {
  FavoritesIcon,
  HomeIcon,
  Logo,
  SettingsIcon,
  TrendsIcon,
} from "../../assets/icons";
import Username from "../Username";

import styles from "./Header.module.scss";
import { Outlet } from "react-router-dom";
import Links from "../Links";
import classNames from "classnames";

const Header = () => {
  const linkArray = [
    { title: "Home", onClick: () => {}, children: <HomeIcon /> },
    { title: "Trends", onClick: () => {}, children: <TrendsIcon /> },
    { title: "Favorites", onClick: () => {}, children: <FavoritesIcon /> },
    { title: "Settings", onClick: () => {}, children: <SettingsIcon /> },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Logo />
        <Search className={styles.search} />
        <Username username={"Violetta Zarubayko"} />
      </div>
      <div className={styles.infoContainer}>
        <Outlet />
      </div>
      <div className={styles.menuContainer}>
        {linkArray.map(({ title, onClick, children }, index) => {
          return (
            <Links
              key={index}
              title={title}
              onClick={onClick}
              className={styles.menuLink}
            >
              {children}
            </Links>
          );
        })}
        <div className={classNames(styles.footer)}>
          <div>© All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
