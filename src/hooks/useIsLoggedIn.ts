import React from "react";
import { ACTIVE_USER_DATA } from "src/utils/constants";
import { RoutesList } from "src/components/Router";

const useIsLoggedIn = () => {
  const isLoggedIn = () => {
    const activeUserJSON = localStorage.getItem(ACTIVE_USER_DATA);
    return !!activeUserJSON;
  };

  return { isLoggedIn };
};

export default useIsLoggedIn;
