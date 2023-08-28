import { ApiResponse } from "apisauce";
import { RegionsResponse } from "src/redux/@type";
import { all, call, put, takeLatest } from "redux-saga/effects";
import API from "src/utils/api";
import { getRegions, setRegions } from "src/redux/reducers/regionSlice";

function* getRegionsWorker() {
  const response: ApiResponse<RegionsResponse> = yield call(API.getRegions);
  if (response.ok && response.data) {
    yield put(setRegions(response.data.results));
  } else {
    console.error("Region error", response.problem);
  }
}

export default function* regionSaga() {
  yield all([takeLatest(getRegions, getRegionsWorker)]);
}
