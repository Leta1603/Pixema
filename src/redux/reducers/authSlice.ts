import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/redux/store";
import { CreateSessionResponseData } from "src/redux/@type";

type InitialStateType = {
  requestToken: string;
  sessionId: string;
  isChanged: boolean;
};

const initialState: InitialStateType = {
  requestToken: "",
  sessionId: "",
  isChanged: false,
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    createRequestToken: (_, __: PayloadAction<undefined>) => {},
    setRequestToken: (state, action: PayloadAction<string>) => {
      state.requestToken = action.payload;
    },
    createSession: (_, __: PayloadAction<string>) => {},
    setSessionId: (state, action: PayloadAction<CreateSessionResponseData>) => {
      state.sessionId = action.payload.session_id;
    },
    setChanged: (state, action: PayloadAction<boolean>) => {
      state.isChanged = action.payload;
    },
    // getAccountId: (_, __: PayloadAction<undefined>) => {},
    // setAccountId: (state, action: PayloadAction<number>) => {
    //   state.accountId = action.payload;
    // },
  },
});

export const {
  createRequestToken,
  setRequestToken,
  createSession,
  setSessionId,
  setChanged,
  // getAccountId,
  // setAccountId,
} = authSlice.actions;

export const AuthSelectors = {
  createRequestToken: (state: RootState) => state.authReducer.requestToken,
  getChanged: (state: RootState) => state.authReducer.isChanged,
};

export default authSlice.reducer;
