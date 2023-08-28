import React from "react";
import Header from "src/components/Header";

import styles from "./PagesContainer.module.scss";
import {
  FavoritesIcon,
  HomeIcon,
  SettingsIcon,
  TrendsIcon,
  UpcomingIcon,
} from "src/assets/icons";
import Links from "src/components/Links";
import classNames from "classnames";
import { Outlet, useNavigate } from "react-router-dom";
import { RoutesList } from "src/components/Router";
import { useIsLoggedIn } from "src/hooks";
import FilterModalWindow from "src/components/FilterModalWindow";
import { useThemeContext } from "src/context/Theme";
import { Theme } from "src/@types";

const PagesContainer = () => {
  const { themeValue } = useThemeContext();

  const navigate = useNavigate();

  const isLoggedIn = useIsLoggedIn().isLoggedIn();

  const linkArray = [
    {
      title: "Home",
      onClick: () => {
        navigate(RoutesList.Home);
      },
      children: <HomeIcon />,
    },
    {
      title: "Trends",
      onClick: () => {
        navigate(RoutesList.Trends);
      },
      children: <TrendsIcon />,
    },
    {
      title: "Favorites",
      onClick: () => {
        navigate(RoutesList.Favorites);
      },
      children: <FavoritesIcon />,
    },
    {
      title: "Settings",
      onClick: () => {
        navigate(RoutesList.Settings);
      },
      children: <SettingsIcon />,
    },
    {
      title: "Upcoming",
      onClick: () => {
        navigate(RoutesList.Upcoming);
      },
      children: <UpcomingIcon />,
    },
  ];

  return (
    <>
      <div
        className={classNames(styles.page, {
          [styles.signUpPage]: !isLoggedIn,
          [styles.lightPage]: themeValue === Theme.Light,
        })}
      >
        <Header />
        <div
          className={classNames(styles.main, {
            [styles.signUpMain]: !isLoggedIn,
          })}
        >
          {isLoggedIn && (
            <div className={styles.menuContainer}>
              {linkArray.map(({ title, onClick, children }, index) => {
                return (
                  <Links key={index} title={title} onClick={onClick}>
                    {children}
                  </Links>
                );
              })}
              <div className={classNames(styles.footer)}>
                <div>© All Rights Reserved</div>
              </div>
            </div>
          )}
          <div className={styles.infoContainer}>
            <Outlet />
          </div>
          {!isLoggedIn && (
            <div className={classNames(styles.footerForm)}>
              <div>© All Rights Reserved</div>
            </div>
          )}
        </div>
      </div>
      <FilterModalWindow />
    </>
  );
};

export default PagesContainer;
