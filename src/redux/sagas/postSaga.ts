import { all, takeLatest, call, put, delay } from "redux-saga/effects";
import {
  getFilterMovieList,
  getPostDetails,
  getPostList,
  getRecommendations,
  getSearchedPosts,
  getTrends,
  getUpcomingMovies,
  setFilterMovieList,
  setPostDetails,
  setPostList,
  setPostListLoading,
  setRecommendations,
  setSearchedPosts,
  setSearchedPostsLoading,
  setTrends,
  setTrendsLoading,
  setUpcomingMovies,
  setUpcomingMoviesLoading,
} from "../reducers/postSlice";
import { ApiResponse } from "apisauce";
import API from "src/utils/api";

import {
  GetFilterPayload,
  GetPostDetails,
  GetPostsPayload,
  GetPostsResponse,
  SearchPayload,
  SearchResponse,
  UpcomingResponse,
} from "../@type";
import { PayloadAction } from "@reduxjs/toolkit";

function* getPostWorker(action: PayloadAction<GetPostsPayload>) {
  yield put(setPostListLoading(true));
  const { page, isOverwrite } = action.payload;
  const response: ApiResponse<GetPostsResponse> = yield call(
    API.getPosts,
    page,
  );
  if (response.ok && response.data) {
    yield put(
      setPostList({
        postList: response.data.results,
        isOverwrite: isOverwrite,
      }),
    );
  } else {
    console.error("Post List error", response.problem);
  }
  yield put(setPostListLoading(false));
}

function* getFilterMovieListWorker(action: PayloadAction<GetFilterPayload>) {
  const {
    page,
    isOverwrite,
    sort_by,
    region,
    vote_average_from,
    vote_average_to,
    with_genres,
    release_date_from,
    release_date_to,
  } = action.payload;
  const response: ApiResponse<GetPostsResponse> = yield call(
    API.getPosts,
    page,
    sort_by,
    1000,
    release_date_from,
    release_date_to,
    vote_average_from,
    vote_average_to,
    with_genres,
    region,
  );
  if (response.ok && response.data) {
    yield put(
      setFilterMovieList({
        postList: response.data.results,
        isOverwrite: isOverwrite,
        total_pages: response.data.total_pages,
      }),
    );
  } else {
    console.error("Filter Movie error", response.problem);
  }
}

function* getPostDetailsWorker(action: PayloadAction<string>) {
  const response: ApiResponse<GetPostDetails> = yield call(
    API.getPostDetails,
    action.payload,
  );
  if (response.ok && response.data) {
    yield put(setPostDetails(response.data));
  } else {
    console.error("Post Details error", response.problem);
  }
}

function* getPostRecommendationsWorker(action: PayloadAction<string>) {
  const response: ApiResponse<GetPostsResponse> = yield call(
    API.getRecommendations,
    action.payload,
  );
  if (response.ok && response.data) {
    yield put(setRecommendations(response.data.results));
  } else {
    console.error("Post Details error", response.problem);
  }
}

function* getTrendsWorker(action: PayloadAction<GetPostsPayload>) {
  yield put(setTrendsLoading(true));
  const { page, isOverwrite } = action.payload;
  const response: ApiResponse<GetPostsResponse> = yield call(
    API.getTrends,
    page,
  );
  if (response.ok && response.data) {
    yield put(
      setTrends({
        postList: response.data.results,
        isOverwrite: isOverwrite,
      }),
    );
  } else {
    console.error("Trend List error", response.problem);
  }
  yield put(setTrendsLoading(false));
}

function* getSearchedPostWorker(action: PayloadAction<SearchPayload>) {
  yield put(setSearchedPostsLoading(true));
  const { page, isOverwrite, query } = action.payload;
  yield delay(500);
  const response: ApiResponse<SearchResponse> = yield call(
    API.getSearch,
    page,
    query,
  );
  if (response.ok && response.data) {
    yield put(
      setSearchedPosts({
        postList: response.data.results,
        isOverwrite: isOverwrite,
        total_pages: response.data.total_pages,
      }),
    );
  } else {
    console.error("Searched Post error", response.problem);
  }
  yield put(setSearchedPostsLoading(false));
}

function* getUpcomingMoviesWorker(action: PayloadAction<GetPostsPayload>) {
  yield put(setUpcomingMoviesLoading(true));
  const { page, isOverwrite } = action.payload;
  const response: ApiResponse<UpcomingResponse> = yield call(
    API.getUpcomingMovies,
    page,
  );
  if (response.ok && response.data) {
    yield put(
      setUpcomingMovies({
        postList: response.data.results,
        isOverwrite: isOverwrite,
        total_pages: response.data.total_pages,
      }),
    );
  } else {
    console.error("Upcoming Movie error", response.problem);
  }
  yield put(setUpcomingMoviesLoading(false));
}

export default function* postSaga() {
  yield all([
    takeLatest(getPostList, getPostWorker),
    takeLatest(getPostDetails, getPostDetailsWorker),
    takeLatest(getRecommendations, getPostRecommendationsWorker),
    takeLatest(getTrends, getTrendsWorker),
    takeLatest(getSearchedPosts, getSearchedPostWorker),
    takeLatest(getFilterMovieList, getFilterMovieListWorker),
    takeLatest(getUpcomingMovies, getUpcomingMoviesWorker),
  ]);
}
