import React, { useEffect, useState } from "react";
import PostList from "src/components/PostsList";
import { useDispatch, useSelector } from "react-redux";
import {
  getUpcomingMovies,
  MovieSelectors,
} from "src/redux/reducers/movieSlice";
import Pagination from "src/components/Pagination/Pagination";

const Upcoming = () => {
  const dispatch = useDispatch();

  const upcomingList = useSelector(MovieSelectors.getUpcomingMovies);
  const isListLoading = useSelector(MovieSelectors.getUpcomingMoviesLoading);
  const totalPages = useSelector(MovieSelectors.getUpcomingMoviesTotalPages);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getUpcomingMovies({ page: currentPage, isOverwrite: true }));
  }, [currentPage]);

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <>
      <PostList postList={upcomingList} isListLoading={isListLoading} />
      <Pagination
        pagesCount={totalPages}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default Upcoming;
