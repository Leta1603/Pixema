import { all, call, put, takeLatest } from "redux-saga/effects";

import API from "src/utils/api";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  CreateRequestTokenResponse,
  CreateSessionData,
  CreateSessionPayloadData,
  CreateSessionResponseData,
} from "src/redux/@type";
import { ApiResponse } from "apisauce";
import {
  createRequestToken,
  createSession,
  setRequestToken,
  setSessionId,
} from "src/redux/reducers/authSlice";
import { ACCOUNT_ID, SESSION_ID } from "src/utils/constants";

function* createRequestTokenWorker() {
  const response: ApiResponse<CreateRequestTokenResponse> = yield call(
    API.createRequestToken,
  );
  if (response.ok && response.data) {
    yield put(setRequestToken(response.data.request_token));
  } else {
    console.error("Create Request Token error", response.problem);
  }
}

function* createSessionWorker(action: PayloadAction<string>) {
  const response: ApiResponse<CreateSessionResponseData> = yield call(
    API.createSession,
    { request_token: action.payload },
  );
  if (response.ok && response.data) {
    yield put(setSessionId(response.data));
    localStorage.setItem(SESSION_ID, response.data.session_id);
  } else {
    console.error("Create Session error", response.problem);
  }
}

// function* getAccountIdWorker(action: PayloadAction<AccountDetailsData>) {
//   const sessionId = localStorage.getItem(SESSION_ID) || "";
//   const response: ApiResponse<AccountDetailsResponseData> = yield call(
//     API.accountDetails,
//     ACCOUNT_ID,
//     sessionId,
//   );
//   if (response.ok && response.data) {
//     yield put(setAccountId(response.data.id))
//     // yield put(setSessionId(response.data));
//     // localStorage.setItem(SESSION_ID, response.data.session_id);
//     // callback();
//   } else {
//     console.error("Get Account Id error", response.problem);
//   }
// }

export default function* authSaga() {
  yield all([
    takeLatest(createRequestToken, createRequestTokenWorker),
    takeLatest(createSession, createSessionWorker),
  ]);
}
