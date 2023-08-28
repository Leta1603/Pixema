import { configureStore } from "@reduxjs/toolkit";
import createSadaMiddleware from "redux-saga";

import postReducer from "./reducers/postSlice";
import authReducer from "./reducers/authSlice";
import genreReducer from "./reducers/genreSlice";
import regionReducer from "./reducers/regionSlice";
import themeReducer from "./reducers/themeSlice";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSadaMiddleware();

const store = configureStore({
  reducer: {
    authReducer,
    postReducer,
    genreReducer,
    regionReducer,
    themeReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
