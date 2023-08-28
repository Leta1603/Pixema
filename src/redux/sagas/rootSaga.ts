import postSaga from "./postSaga";
import { all } from "redux-saga/effects";
import authSaga from "src/redux/sagas/authSaga";
import genreSaga from "src/redux/sagas/genreSaga";
import regionSaga from "src/redux/sagas/regionSaga";

export default function* rootSaga() {
  yield all([authSaga(), postSaga(), genreSaga(), regionSaga()]);
}
