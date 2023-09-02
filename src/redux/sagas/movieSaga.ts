import { all, takeLatest, call, put, delay } from "redux-saga/effects";
import {
  getFilterMovieList,
  getMovieDetails,
  getMovieList,
  getRecommendations,
  getSearchedMovies,
  getTrends,
  getUpcomingMovies,
  setFilterMovieList,
  setMovieDetails,
  setMovieList,
  setMovieListLoading,
  setRecommendations,
  setSearchedMovies,
  setSearchedMoviesLoading,
  setTrends,
  setTrendsLoading,
  setUpcomingMovies,
  setUpcomingMoviesLoading,
} from "../reducers/movieSlice";
import { ApiResponse } from "apisauce";
import API from "src/utils/api";

import {
  GetFilterPayload,
  GetMovieDetails,
  GetMoviesPayload,
  GetMoviesResponse,
  SearchPayload,
  SearchResponse,
  UpcomingResponse,
} from "../@type";
import { PayloadAction } from "@reduxjs/toolkit";

function* getMovieWorker(action: PayloadAction<GetMoviesPayload>) {
  yield put(setMovieListLoading(true));
  const { page, isOverwrite } = action.payload;
  const response: ApiResponse<GetMoviesResponse> = yield call(
    API.getMovies,
    page,
  );
  if (response.ok && response.data) {
    yield put(
      setMovieList({
        movieList: response.data.results,
        isOverwrite: isOverwrite,
      }),
    );
  } else {
    console.error("Movie List error", response.problem);
  }
  yield put(setMovieListLoading(false));
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
  const response: ApiResponse<GetMoviesResponse> = yield call(
    API.getMovies,
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
        movieList: response.data.results,
        isOverwrite: isOverwrite,
        total_pages: response.data.total_pages,
      }),
    );
  } else {
    console.error("Filter Movie error", response.problem);
  }
}

function* GetMovieDetailsWorker(action: PayloadAction<string>) {
  const response: ApiResponse<GetMovieDetails> = yield call(
    API.getMovieDetails,
    action.payload,
  );
  if (response.ok && response.data) {
    yield put(setMovieDetails(response.data));
  } else {
    console.error("Movie Details error", response.problem);
  }
}

function* getMovieRecommendationsWorker(action: PayloadAction<string>) {
  const response: ApiResponse<GetMoviesResponse> = yield call(
    API.getRecommendations,
    action.payload,
  );
  if (response.ok && response.data) {
    yield put(setRecommendations(response.data.results));
  } else {
    console.error("Movie Details error", response.problem);
  }
}

function* getTrendsWorker(action: PayloadAction<GetMoviesPayload>) {
  yield put(setTrendsLoading(true));
  const { page, isOverwrite } = action.payload;
  const response: ApiResponse<GetMoviesResponse> = yield call(
    API.getTrends,
    page,
  );
  if (response.ok && response.data) {
    yield put(
      setTrends({
        movieList: response.data.results,
        isOverwrite: isOverwrite,
      }),
    );
  } else {
    console.error("Trend List error", response.problem);
  }
  yield put(setTrendsLoading(false));
}

function* getSearchedMovieWorker(action: PayloadAction<SearchPayload>) {
  yield put(setSearchedMoviesLoading(true));
  const { page, isOverwrite, query } = action.payload;
  yield delay(500);
  const response: ApiResponse<SearchResponse> = yield call(
    API.getSearch,
    page,
    query,
  );
  if (response.ok && response.data) {
    yield put(
      setSearchedMovies({
        movieList: response.data.results,
        isOverwrite: isOverwrite,
        total_pages: response.data.total_pages,
      }),
    );
  } else {
    console.error("Searched Movie error", response.problem);
  }
  yield put(setSearchedMoviesLoading(false));
}

function* getUpcomingMoviesWorker(action: PayloadAction<GetMoviesPayload>) {
  yield put(setUpcomingMoviesLoading(true));
  const { page, isOverwrite } = action.payload;
  const response: ApiResponse<UpcomingResponse> = yield call(
    API.getUpcomingMovies,
    page,
  );
  if (response.ok && response.data) {
    yield put(
      setUpcomingMovies({
        movieList: response.data.results,
        isOverwrite: isOverwrite,
        total_pages: response.data.total_pages,
      }),
    );
  } else {
    console.error("Upcoming Movie error", response.problem);
  }
  yield put(setUpcomingMoviesLoading(false));
}

export default function* movieSaga() {
  yield all([
    takeLatest(getMovieList, getMovieWorker),
    takeLatest(getMovieDetails, GetMovieDetailsWorker),
    takeLatest(getRecommendations, getMovieRecommendationsWorker),
    takeLatest(getTrends, getTrendsWorker),
    takeLatest(getSearchedMovies, getSearchedMovieWorker),
    takeLatest(getFilterMovieList, getFilterMovieListWorker),
    takeLatest(getUpcomingMovies, getUpcomingMoviesWorker),
  ]);
}
