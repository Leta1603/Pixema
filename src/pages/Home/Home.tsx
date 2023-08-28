import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostList, PostSelectors } from "src/redux/reducers/postSlice";
import PostList from "src/components/PostsList";
import { getGenres } from "src/redux/reducers/genreSlice";
import Pagination from "src/components/Pagination";
import { PAGES_COUNT } from "src/utils/constants";
import { useThemeContext } from "src/context/Theme";
import Button from "src/components/Button";
import { ButtonTypes, Theme } from "src/@types";

const Home = () => {
  const dispatch = useDispatch();
  const { themeValue, onChangeTheme } = useThemeContext();

  const [currentPage, setCurrentPage] = useState(1);

  const postList = useSelector(PostSelectors.getPostList);
  const isListLoading = useSelector(PostSelectors.getPostLoading);

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    dispatch(getPostList({ page: currentPage, isOverwrite: true }));
  }, [currentPage]);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <div>

      <PostList postList={postList} isListLoading={isListLoading} />
      <Pagination
        pagesCount={PAGES_COUNT}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
