import React, { useEffect, useState } from "react";
import PostList from "src/components/PostsList";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrends,
  getUpcomingMovies,
  PostSelectors,
} from "src/redux/reducers/postSlice";
import Pagination from "src/components/Pagination/Pagination";

const Upcoming = () => {
  const dispatch = useDispatch();

  const upcomingList = useSelector(PostSelectors.getUpcomingMovies);
  const isListLoading = useSelector(PostSelectors.getUpcomingMoviesLoading);
  const totalPages = useSelector(PostSelectors.getUpcomingMoviesTotalPages);

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
