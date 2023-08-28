import { all, call, put, takeLatest } from "redux-saga/effects";

import API from "src/utils/api";
import { ApiResponse } from "apisauce";
import { GenresResponse } from "src/redux/@type";
import { getGenres, setGenres } from "src/redux/reducers/genreSlice";
function* getGenresWorker() {
  const response: ApiResponse<GenresResponse> = yield call(API.getGenres);
  if (response.ok && response.data) {
    yield put(setGenres(response.data.genres));
  } else {
    console.error("Genres error", response.problem);
  }
}

export default function* genreSaga() {
  yield all([takeLatest(getGenres, getGenresWorker)]);
}
