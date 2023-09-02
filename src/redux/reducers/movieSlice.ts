import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  FavoriteObjectsTypes,
  FavoriteTypes,
  GetFilterPayload,
  GetMovieDetails,
  GetMoviesPayload,
  PostListProps,
  SearchPayload,
  SetMoviesPayload,
  SetSearchedMoviesPayload,
} from "src/redux/@type";
import { FAVORITE_MOVIES } from "src/utils/constants";
import { toast } from "react-toastify";

type InitialState = {
  movieList: PostListProps;
  movieDetails: GetMovieDetails | null;
  movieRecommendations: PostListProps;
  trendList: PostListProps;
  favoriteMoviesObjects: FavoriteObjectsTypes[];
  favoriteMovies: FavoriteTypes;
  isMovieListLoading: boolean;
  isTrendsLoading: boolean;
  isSearchedMoviesLoading: boolean;
  searchedMovies: PostListProps;
  isUpcomingMoviesLoading: boolean;
  upcomingMovies: PostListProps;
  upcomingMoviesTotalPages: number;
  searchedMoviesTotalPages: number;
  isFilterModalOpened: boolean;
  filterMovieList: PostListProps;
  filterMovieTotalPages: number;
};

let favoriteJSON = localStorage.getItem(FAVORITE_MOVIES);

const initialState: InitialState = {
  favoriteMoviesObjects: favoriteJSON ? JSON.parse(favoriteJSON) : [],
  movieList: [],
  movieDetails: null,
  movieRecommendations: [],
  trendList: [],
  favoriteMovies: [],
  isMovieListLoading: false,
  isTrendsLoading: false,
  isSearchedMoviesLoading: false,
  searchedMovies: [],
  searchedMoviesTotalPages: 0,
  isFilterModalOpened: false,
  filterMovieList: [],
  filterMovieTotalPages: 0,
  upcomingMovies: [],
  isUpcomingMoviesLoading: false,
  upcomingMoviesTotalPages: 0,
};

const movieSlice = createSlice({
  name: "movieReducer",
  initialState,
  reducers: {
    getMovieList: (_, __: PayloadAction<GetMoviesPayload>) => {},
    setMovieList: (state, action: PayloadAction<SetMoviesPayload>) => {
      const { movieList, isOverwrite } = action.payload;
      if (isOverwrite) {
        state.movieList = movieList;
      } else {
        state.movieList.push(...movieList);
      }
    },
    setMovieListLoading: (state, action: PayloadAction<boolean>) => {
      state.isMovieListLoading = action.payload;
    },

    getMovieDetails: (_, __: PayloadAction<string>) => {},
    setMovieDetails: (state, action: PayloadAction<GetMovieDetails>) => {
      state.movieDetails = action.payload;
    },

    getRecommendations: (_, __: PayloadAction<string>) => {},
    setRecommendations: (state, action: PayloadAction<PostListProps>) => {
      state.movieRecommendations = action.payload;
    },

    getTrends: (_, __: PayloadAction<GetMoviesPayload>) => {},
    setTrends: (state, action: PayloadAction<SetMoviesPayload>) => {
      const { movieList, isOverwrite } = action.payload;
      if (isOverwrite) {
        state.trendList = movieList;
      } else {
        state.trendList.push(...movieList);
      }
    },
    setTrendsLoading: (state, action: PayloadAction<boolean>) => {
      state.isTrendsLoading = action.payload;
    },

    setFavoriteMovies: (state, action: PayloadAction<string>) => {
      if (state.favoriteMoviesObjects.length > 0) {
        state.favoriteMoviesObjects.forEach(({ user, movies }) => {
          if (user === action.payload) {
            state.favoriteMovies = movies;
          }
        });
      }
    },
    setFavoriteObjectMovies: (
      state,
      action: PayloadAction<{ movie: GetMovieDetails; activeUserId: string }>,
    ) => {
      const { movie, activeUserId } = action.payload;
      console.log(state.favoriteMoviesObjects.length);

      let isActiveUserHasFavoriteMovies = false;
      state.favoriteMoviesObjects.forEach(({ user, movies }) => {
        console.log("activeUserId = ", activeUserId);
        console.log("user = ", user);
        if (user === activeUserId) {
          isActiveUserHasFavoriteMovies = true;
          console.log("user === activeUserId");
          const favoriteIndex = movies.findIndex((item) => item.id === movie.id);
          if (favoriteIndex === -1) {
            movies.push(movie);
            toast.success("Movie added to favorites", {
              autoClose: 2000,
              theme: "dark",
            });
          } else {
            movies.splice(favoriteIndex, 1);
            toast.error("Movie removed from favorites", {
              autoClose: 2000,
              theme: "dark",
            });
          }
          state.favoriteMovies = movies;
          localStorage.setItem(
            FAVORITE_MOVIES,
            JSON.stringify(state.favoriteMoviesObjects),
          );
        } else {
          console.log("user !== activeUserId");
        }
      });
      if (!isActiveUserHasFavoriteMovies) {
        state.favoriteMoviesObjects.push({
          user: activeUserId,
          movies: [movie],
        });
        state.favoriteMovies = state.favoriteMoviesObjects[0].movies;
        toast.success("Movie added to favorites", {
          autoClose: 2000,
          theme: "dark",
        });
        localStorage.setItem(
          FAVORITE_MOVIES,
          JSON.stringify(state.favoriteMoviesObjects),
        );
      }
    },

    getSearchedMovies: (_, __: PayloadAction<SearchPayload>) => {},
    setSearchedMovies: (
      state,
      action: PayloadAction<SetSearchedMoviesPayload>,
    ) => {
      const { movieList, total_pages, isOverwrite } = action.payload;
      state.searchedMoviesTotalPages = total_pages;
      if (isOverwrite) {
        state.searchedMovies = movieList;
      } else {
        state.searchedMovies.push(...movieList);
      }
    },
    setSearchedMoviesLoading: (state, action: PayloadAction<boolean>) => {
      state.isSearchedMoviesLoading = action.payload;
    },

    getUpcomingMovies: (_, __: PayloadAction<GetMoviesPayload>) => {},
    setUpcomingMovies: (
      state,
      action: PayloadAction<SetSearchedMoviesPayload>,
    ) => {
      const { movieList, total_pages, isOverwrite } = action.payload;
      state.upcomingMoviesTotalPages = total_pages;
      if (isOverwrite) {
        state.upcomingMovies = movieList;
      } else {
        state.upcomingMovies.push(...movieList);
      }
    },
    setUpcomingMoviesLoading: (state, action: PayloadAction<boolean>) => {
      state.isUpcomingMoviesLoading = action.payload;
    },

    clearSearchedMovies: (state) => {
      state.searchedMovies = [];
    },

    setFilterModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isFilterModalOpened = action.payload;
    },
    getFilterMovieList: (_, __: PayloadAction<GetFilterPayload>) => {},
    setFilterMovieList: (
      state,
      action: PayloadAction<SetSearchedMoviesPayload>,
    ) => {
      const { movieList, total_pages, isOverwrite } = action.payload;
      state.filterMovieTotalPages = total_pages;
      if (isOverwrite) {
        state.filterMovieList = movieList;
      } else {
        state.filterMovieList.push(...movieList);
      }
    },
  },
});

export const {
  getMovieList,
  setMovieList,
  getMovieDetails,
  setMovieDetails,
  getRecommendations,
  setRecommendations,
  getTrends,
  setTrends,
  setFavoriteMovies,
  setMovieListLoading,
  setTrendsLoading,
  setSearchedMovies,
  getSearchedMovies,
  setSearchedMoviesLoading,
  clearSearchedMovies,
  setFilterModalOpened,
  setFilterMovieList,
  getFilterMovieList,
  setFavoriteObjectMovies,
  setUpcomingMoviesLoading,
  getUpcomingMovies,
  setUpcomingMovies,
} = movieSlice.actions; //actions

export const MovieSelectors = {
  getMovieList: (state: RootState) => state.movieReducer.movieList,
  getMovieDetails: (state: RootState) => state.movieReducer.movieDetails,
  getRecommendations: (state: RootState) =>
    state.movieReducer.movieRecommendations,
  getTrends: (state: RootState) => state.movieReducer.trendList,
  getFavoriteMovies: (state: RootState) => state.movieReducer.favoriteMovies,
  getSearchedMovies: (state: RootState) => state.movieReducer.searchedMovies,
  getMovieLoading: (state: RootState) => state.movieReducer.isMovieListLoading,
  getTrendsLoading: (state: RootState) => state.movieReducer.isTrendsLoading,
  getSearchedMoviesLoading: (state: RootState) =>
    state.movieReducer.isSearchedMoviesLoading,
  getSearchedMoviesTotalPages: (state: RootState) =>
    state.movieReducer.searchedMoviesTotalPages,
  getFilterMovieList: (state: RootState) => state.movieReducer.filterMovieList,
  getFilterMovieOpened: (state: RootState) =>
    state.movieReducer.isFilterModalOpened,
  getFilterMovieTotalPages: (state: RootState) =>
    state.movieReducer.filterMovieTotalPages,
  getUpcomingMovies: (state: RootState) => state.movieReducer.upcomingMovies,
  getUpcomingMoviesLoading: (state: RootState) =>
    state.movieReducer.isUpcomingMoviesLoading,
  getUpcomingMoviesTotalPages: (state: RootState) =>
    state.movieReducer.upcomingMoviesTotalPages,
};

export default movieSlice.reducer;
