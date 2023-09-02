import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getMovieList, MovieSelectors} from "src/redux/reducers/movieSlice";
import PostList from "src/components/PostsList";
import { getGenres } from "src/redux/reducers/genreSlice";
import Pagination from "src/components/Pagination";
import { PAGES_COUNT } from "src/utils/constants";

const Home = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const postList = useSelector(MovieSelectors.getMovieList);
  const isListLoading = useSelector(MovieSelectors.getMovieLoading);

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    dispatch(getMovieList({ page: currentPage, isOverwrite: true }));
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
