import React, { useEffect } from "react";
import PostList from "src/components/PostsList";
import { useDispatch, useSelector } from "react-redux";
import { PostSelectors, setFavoritePosts } from "src/redux/reducers/postSlice";
import { ACTIVE_USER_DATA } from "src/utils/constants";

const Favorites = () => {
  const dispatch = useDispatch();

  const activeUser = JSON.parse(localStorage.getItem(ACTIVE_USER_DATA) || "");
  const activeUserId = activeUser.session_id;

  useEffect(() => {
    dispatch(setFavoritePosts(activeUserId));
  }, []);

  const favoritesList = useSelector(PostSelectors.getFavoritePosts);

  return <PostList postList={favoritesList} />;
};

export default Favorites;
