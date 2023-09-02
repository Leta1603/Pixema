import { useDispatch, useSelector } from "react-redux";
import {
  getFilterMovieList,
  MovieSelectors,
} from "src/redux/reducers/movieSlice";
import PostList from "src/components/PostsList";
import React, { useEffect, useState } from "react";
import EmptyState from "src/components/EmptyState";
import Pagination from "src/components/Pagination/Pagination";
import { useParams } from "react-router-dom";
import { queryParamsType, TabsType } from "src/@types";

const Filter = () => {
  const { queryString } = useParams();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const filterList = useSelector(MovieSelectors.getFilterMovieList);
  const totalPages = useSelector(MovieSelectors.getFilterMovieTotalPages);

  const queryStringToObject = (queryString: string): queryParamsType => {
    const queryParamsArray = queryString.split("&");
    const queryParamsObject: Partial<queryParamsType> = {};

    queryParamsArray.forEach((param) => {
      const [key, value] = param.split("=");
      queryParamsObject[key as keyof queryParamsType] = value;
    });

    return queryParamsObject as queryParamsType;
  };

  useEffect(() => {
    if (queryString) {
      const {
        sort_by,
        release_date_from,
        release_date_to,
        vote_average_from,
        vote_average_to,
        with_genres,
        region,
      } = queryStringToObject(queryString);

      dispatch(
        getFilterMovieList({
          page: currentPage,
          isOverwrite: true,
          sort_by:
            sort_by === TabsType.Rating
              ? "vote_average.desc"
              : "primary_release_date.desc",
          with_genres: with_genres,
          region: region,
          release_date_from: release_date_from,
          release_date_to: release_date_to,
          vote_average_from: vote_average_from,
          vote_average_to: vote_average_to,
        }),
      );
    }
  }, [currentPage, queryString]);

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div>
      {filterList.length ? (
        <>
          <PostList postList={filterList} />
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

export default Filter;
