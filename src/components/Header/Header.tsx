import React, { useEffect, useState } from "react";
import Search from "../Search";
import { Logo } from "src/assets/icons";
import Username from "../Username";

import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/components/Router";
import { useIsLoggedIn } from "src/hooks";
import { ACTIVE_USER_DATA } from "src/utils/constants";
import { UserListType } from "src/redux/@type";
import { useSelector } from "react-redux";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import { useThemeContext } from "src/context/Theme";
import { Theme } from "src/@types";

const Header = () => {
  const { themeValue } = useThemeContext();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const isUserChanged = useSelector(AuthSelectors.getChanged);

  const isLoggedIn = useIsLoggedIn().isLoggedIn();

  const userJSON = localStorage.getItem(ACTIVE_USER_DATA);

  useEffect(() => {
    if (userJSON) {
      const user: UserListType = JSON.parse(userJSON);
      setUsername(user.username);
    }
  }, [isUserChanged]);

  const onLogoClick = () => {
    navigate(RoutesList.Home);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo} onClick={onLogoClick}>
          {themeValue === Theme.Dark ? <Logo /> : <Logo fill={"#000"} />}
        </div>
        {isLoggedIn && (
          <>
            <div className={styles.search}>
              <Search />
            </div>
          </>
        )}
        {isLoggedIn && <Username username={username} />}
      </div>
    </div>
  );
};

export default Header;
