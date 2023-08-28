import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GenresData } from "src/redux/@type";
import { RootState } from "src/redux/store";

type InitialState = {
  genres: GenresData[];
};

const initialState: InitialState = {
  genres: [],
};

const genreSlice = createSlice({
  name: "genreReducer",
  initialState,
  reducers: {
    getGenres: (_, __: PayloadAction<undefined>) => {},
    setGenres: (state, action: PayloadAction<GenresData[]>) => {
      state.genres = action.payload;
    },
  },
});

export const { getGenres, setGenres } = genreSlice.actions;

export const GenreSelectors = {
  getGenres: (state: RootState) => state.genreReducer.genres,
};

export default genreSlice.reducer;
