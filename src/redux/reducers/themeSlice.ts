import { Theme } from "src/@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/redux/store";
import { THEME } from "src/utils/constants";

type InitialState = {
  themeValue: Theme;
};

const theme: Theme = JSON.parse(localStorage.getItem(THEME) || "");

const initialState: InitialState = {
  themeValue: theme,
};

const themeSlice = createSlice({
  name: "themeReducer",
  initialState,
  reducers: {
    setThemeValue: (state, action: PayloadAction<Theme>) => {
      state.themeValue = action.payload;
      localStorage.setItem(THEME, JSON.stringify(state.themeValue));
    },
  },
});

export const { setThemeValue } = themeSlice.actions;

export const ThemeSelectors = {
  getThemeValue: (state: RootState) => state.themeReducer.themeValue,
};

export default themeSlice.reducer;
