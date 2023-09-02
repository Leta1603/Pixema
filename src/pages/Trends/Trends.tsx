import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrends, MovieSelectors } from "src/redux/reducers/movieSlice";
import { TOTAL_MOVIES_COUNT } from "src/utils/constants";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "src/components/Loader";

import PostList from "src/components/PostsList";

const Trends = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const trendList = useSelector(MovieSelectors.getTrends);
  const isListLoading = useSelector(MovieSelectors.getTrendsLoading);

  const onNextReached = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    dispatch(getTrends({ page: currentPage, isOverwrite: false }));
  }, [currentPage]);

  return (
    <InfiniteScroll
      next={onNextReached}
      scrollThreshold={0.7}
      hasMore={trendList.length < TOTAL_MOVIES_COUNT}
      loader={<Loader />}
      dataLength={trendList.length}
      scrollableTarget="scrollableDiv"
    >
      <PostList
        isTrend={true}
        isListLoading={isListLoading}
        postList={trendList}
      />
    </InfiniteScroll>
  );
};

export default Trends;
