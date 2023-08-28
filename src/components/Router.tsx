import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Home from "../pages/Home";
import SignUp from "src/pages/SignUp";
import PagesContainer from "src/components/PagesContainer";
import SignIn from "src/pages/SignIn";
import SingleMovie from "src/pages/SingleMovie";
import { useIsLoggedIn } from "src/hooks";
import Trends from "src/pages/Trends";
import Favorites from "src/pages/Favorites";
import Search from "src/pages/Search";
import { ToastContainer } from "react-toastify";
import Filter from "src/pages/Filter";
import ResetPassword from "src/pages/ResetPassword";
import NewPassword from "src/pages/NewPassword";
import Settings from "src/pages/Settings";
import Upcoming from "src/pages/Upcoming";

export enum RoutesList {
  Home = "/",
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  SelectedPost = `/movie/:id`,
  Trends = "/trends",
  Favorites = "/favorites",
  Settings = "/settings",
  Upcoming = "/upcoming",
  Search = "/movies/:search",
  Filter = "/filter/:queryString",
  ResetPassword = "/password/reset",
  NewPassword = "/newPassword/:email",
  Default = "*",
}

const Router = () => {
  const isLoggedIn = useIsLoggedIn().isLoggedIn();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RoutesList.Home} element={<PagesContainer />}>
            <Route
              path={RoutesList.Home}
              element={
                isLoggedIn ? <Home /> : <Navigate to={RoutesList.SignIn} />
              }
            />
            <Route
              path={RoutesList.Home}
              element={
                isLoggedIn ? <Home /> : <Navigate to={RoutesList.SignIn} />
              }
            />
            <Route
              path={RoutesList.SignUp}
              element={
                isLoggedIn ? <Navigate to={RoutesList.Home} /> : <SignUp />
              }
            />
            <Route
              path={RoutesList.SignIn}
              element={
                isLoggedIn ? <Navigate to={RoutesList.Home} /> : <SignIn />
              }
            />
            <Route
              path={RoutesList.ResetPassword}
              element={
                isLoggedIn ? (
                  <Navigate to={RoutesList.Home} />
                ) : (
                  <ResetPassword />
                )
              }
            />
            <Route
              path={RoutesList.NewPassword}
              element={
                isLoggedIn ? <Navigate to={RoutesList.Home} /> : <NewPassword />
              }
            />
            <Route path={RoutesList.SelectedPost} element={<SingleMovie />} />
            <Route path={RoutesList.Trends} element={<Trends />} />
            <Route path={RoutesList.Upcoming} element={<Upcoming />} />
            <Route path={RoutesList.Favorites} element={<Favorites />} />
            <Route path={RoutesList.Filter} element={<Filter />} />
            <Route path={RoutesList.Search} element={<Search />} />
            <Route path={RoutesList.Settings} element={<Settings />} />
            <Route
              path={RoutesList.Default}
              element={<Navigate to={RoutesList.Home} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default Router;
