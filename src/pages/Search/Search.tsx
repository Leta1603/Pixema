import React, { useEffect, useState } from "react";
import PostList from "src/components/PostsList";
import { useDispatch, useSelector } from "react-redux";
import {getSearchedMovies, MovieSelectors} from "src/redux/reducers/movieSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesList } from "src/components/Router";
import EmptyState from "src/components/EmptyState";
import Pagination from "src/components/Pagination/Pagination";

const Search = () => {
  const dispatch = useDispatch();

  const { search } = useParams();

  const navigate = useNavigate();

  const searchedPosts = useSelector(MovieSelectors.getSearchedMovies);
  const isListLoading = useSelector(MovieSelectors.getSearchedMoviesLoading);
  const totalPages = useSelector(MovieSelectors.getSearchedMoviesTotalPages);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!search) {
      navigate(RoutesList.Home);
    } else {
      dispatch(
        getSearchedMovies({
          query: search,
          page: currentPage,
          isOverwrite: true,
        }),
      );
    }
  }, [currentPage, search]);

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div>
      {searchedPosts.length ? (
        <>
          <PostList isListLoading={isListLoading} postList={searchedPosts} />
          <Pagination
            pagesCount={totalPages}
            onPageChange={onPageChange}
            currentPage={currentPage}
          />
        </>
      ) : (
        <EmptyState title={"No movies found"} />
      )}
    </div>
  );
};

export default Search;
