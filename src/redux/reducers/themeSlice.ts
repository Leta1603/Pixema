import { Theme } from "src/@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/redux/store";
import { THEME } from "src/utils/constants";

type InitialState = {
  themeValue: Theme;
};

const themeJSON = localStorage.getItem(THEME);
let theme: Theme;

if (themeJSON) {
  theme = JSON.parse(themeJSON) === "dark" ? Theme.Dark : Theme.Light;
} else {
  theme = Theme.Dark;
}

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
