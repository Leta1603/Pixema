import React, { useEffect } from "react";
import PostList from "src/components/PostsList";
import { useDispatch, useSelector } from "react-redux";
import {MovieSelectors, setFavoriteMovies} from "src/redux/reducers/movieSlice";
import { ACTIVE_USER_DATA } from "src/utils/constants";

const Favorites = () => {
  const dispatch = useDispatch();

  const activeUser = JSON.parse(localStorage.getItem(ACTIVE_USER_DATA) || "");
  const activeUserId = activeUser.session_id;

  useEffect(() => {
    dispatch(setFavoriteMovies(activeUserId));
  }, []);

  const favoritesList = useSelector(MovieSelectors.getFavoriteMovies);

  return <PostList postList={favoritesList} />;
};

export default Favorites;
