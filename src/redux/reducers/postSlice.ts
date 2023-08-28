import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  FavoriteObjectsTypes,
  FavoriteTypes,
  GetFilterPayload,
  GetPostDetails,
  GetPostsPayload,
  PostListProps,
  SearchPayload,
  SetPostsPayload,
  SetSearchedPostsPayload,
} from "src/redux/@type";
import { FAVORITE_POSTS } from "src/utils/constants";
import { toast } from "react-toastify";

type InitialState = {
  postList: PostListProps;
  postDetails: GetPostDetails | null;
  postRecommendations: PostListProps;
  trendList: PostListProps;
  favoritePostsObjects: FavoriteObjectsTypes[];
  favoritePosts: FavoriteTypes;
  isPostListLoading: boolean;
  isTrendsLoading: boolean;
  isSearchedPostsLoading: boolean;
  searchedPosts: PostListProps;
  isUpcomingMoviesLoading: boolean;
  upcomingMovies: PostListProps;
  upcomingMoviesTotalPages: number;
  searchedPostsTotalPages: number;
  isFilterModalOpened: boolean;
  filterMovieList: PostListProps;
  filterMovieTotalPages: number;
};

let favoriteJSON = localStorage.getItem(FAVORITE_POSTS);

const initialState: InitialState = {
  favoritePostsObjects: favoriteJSON ? JSON.parse(favoriteJSON) : [],
  postList: [],
  postDetails: null,
  postRecommendations: [],
  trendList: [],
  favoritePosts: [],
  isPostListLoading: false,
  isTrendsLoading: false,
  isSearchedPostsLoading: false,
  searchedPosts: [],
  searchedPostsTotalPages: 0,
  isFilterModalOpened: false,
  filterMovieList: [],
  filterMovieTotalPages: 0,
  upcomingMovies: [],
  isUpcomingMoviesLoading: false,
  upcomingMoviesTotalPages: 0,
};

const postSlice = createSlice({
  name: "postReducer",
  initialState,
  reducers: {
    getPostList: (_, __: PayloadAction<GetPostsPayload>) => {},
    setPostList: (state, action: PayloadAction<SetPostsPayload>) => {
      const { postList, isOverwrite } = action.payload;
      if (isOverwrite) {
        state.postList = postList;
      } else {
        state.postList.push(...postList);
      }
    },
    setPostListLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostListLoading = action.payload;
    },

    getPostDetails: (_, __: PayloadAction<string>) => {},
    setPostDetails: (state, action: PayloadAction<GetPostDetails>) => {
      state.postDetails = action.payload;
    },

    getRecommendations: (_, __: PayloadAction<string>) => {},
    setRecommendations: (state, action: PayloadAction<PostListProps>) => {
      state.postRecommendations = action.payload;
    },

    getTrends: (_, __: PayloadAction<GetPostsPayload>) => {},
    setTrends: (state, action: PayloadAction<SetPostsPayload>) => {
      const { postList, isOverwrite } = action.payload;
      if (isOverwrite) {
        state.trendList = postList;
      } else {
        state.trendList.push(...postList);
      }
    },
    setTrendsLoading: (state, action: PayloadAction<boolean>) => {
      state.isTrendsLoading = action.payload;
    },

    setFavoritePosts: (state, action: PayloadAction<string>) => {
      if (state.favoritePostsObjects.length > 0) {
        state.favoritePostsObjects.forEach(({ user, movies }) => {
          if (user === action.payload) {
            state.favoritePosts = movies;
          }
        });
      }
    },
    setFavoriteObjectPosts: (
      state,
      action: PayloadAction<{ post: GetPostDetails; activeUserId: string }>,
    ) => {
      const { post, activeUserId } = action.payload;
      console.log(state.favoritePostsObjects.length);

      let isActiveUserHasFavoritePosts = false;
      state.favoritePostsObjects.forEach(({ user, movies }) => {
        console.log("activeUserId = ", activeUserId);
        console.log("user = ", user);
        if (user === activeUserId) {
          isActiveUserHasFavoritePosts = true;
          console.log("user === activeUserId");
          const favoriteIndex = movies.findIndex((item) => item.id === post.id);
          if (favoriteIndex === -1) {
            movies.push(post);
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
          state.favoritePosts = movies;
          localStorage.setItem(
            FAVORITE_POSTS,
            JSON.stringify(state.favoritePostsObjects),
          );
        } else {
          console.log("user !== activeUserId");
        }
      });
      if (!isActiveUserHasFavoritePosts) {
        state.favoritePostsObjects.push({
          user: activeUserId,
          movies: [post],
        });
        state.favoritePosts = state.favoritePostsObjects[0].movies;
        toast.success("Movie added to favorites", {
          autoClose: 2000,
          theme: "dark",
        });
        localStorage.setItem(
          FAVORITE_POSTS,
          JSON.stringify(state.favoritePostsObjects),
        );
      }
    },

    getSearchedPosts: (_, __: PayloadAction<SearchPayload>) => {},
    setSearchedPosts: (
      state,
      action: PayloadAction<SetSearchedPostsPayload>,
    ) => {
      const { postList, total_pages, isOverwrite } = action.payload;
      state.searchedPostsTotalPages = total_pages;
      if (isOverwrite) {
        state.searchedPosts = postList;
      } else {
        state.searchedPosts.push(...postList);
      }
    },
    setSearchedPostsLoading: (state, action: PayloadAction<boolean>) => {
      state.isSearchedPostsLoading = action.payload;
    },

    getUpcomingMovies: (_, __: PayloadAction<GetPostsPayload>) => {},
    setUpcomingMovies: (
      state,
      action: PayloadAction<SetSearchedPostsPayload>,
    ) => {
      const { postList, total_pages, isOverwrite } = action.payload;
      state.upcomingMoviesTotalPages = total_pages;
      if (isOverwrite) {
        state.upcomingMovies = postList;
      } else {
        state.upcomingMovies.push(...postList);
      }
    },
    setUpcomingMoviesLoading: (state, action: PayloadAction<boolean>) => {
      state.isUpcomingMoviesLoading = action.payload;
    },

    clearSearchedPosts: (state) => {
      state.searchedPosts = [];
    },

    setFilterModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isFilterModalOpened = action.payload;
    },
    getFilterMovieList: (_, __: PayloadAction<GetFilterPayload>) => {},
    setFilterMovieList: (
      state,
      action: PayloadAction<SetSearchedPostsPayload>,
    ) => {
      const { postList, total_pages, isOverwrite } = action.payload;
      state.filterMovieTotalPages = total_pages;
      if (isOverwrite) {
        state.filterMovieList = postList;
      } else {
        state.filterMovieList.push(...postList);
      }
    },
  },
});

export const {
  getPostList,
  setPostList,
  getPostDetails,
  setPostDetails,
  getRecommendations,
  setRecommendations,
  getTrends,
  setTrends,
  setFavoritePosts,
  setPostListLoading,
  setTrendsLoading,
  setSearchedPosts,
  getSearchedPosts,
  setSearchedPostsLoading,
  clearSearchedPosts,
  setFilterModalOpened,
  setFilterMovieList,
  getFilterMovieList,
  setFavoriteObjectPosts,
  setUpcomingMoviesLoading,
  getUpcomingMovies,
  setUpcomingMovies,
} = postSlice.actions; //actions

export const PostSelectors = {
  getPostList: (state: RootState) => state.postReducer.postList,
  getPostDetails: (state: RootState) => state.postReducer.postDetails,
  getRecommendations: (state: RootState) =>
    state.postReducer.postRecommendations,
  getTrends: (state: RootState) => state.postReducer.trendList,
  getFavoritePosts: (state: RootState) => state.postReducer.favoritePosts,
  getSearchedPosts: (state: RootState) => state.postReducer.searchedPosts,
  getPostLoading: (state: RootState) => state.postReducer.isPostListLoading,
  getTrendsLoading: (state: RootState) => state.postReducer.isTrendsLoading,
  getSearchedPostsLoading: (state: RootState) =>
    state.postReducer.isSearchedPostsLoading,
  getSearchedPostsTotalPages: (state: RootState) =>
    state.postReducer.searchedPostsTotalPages,
  getFilterMovieList: (state: RootState) => state.postReducer.filterMovieList,
  getFilterMovieOpened: (state: RootState) =>
    state.postReducer.isFilterModalOpened,
  getFilterMovieTotalPages: (state: RootState) =>
    state.postReducer.filterMovieTotalPages,
  getUpcomingMovies: (state: RootState) => state.postReducer.upcomingMovies,
  getUpcomingMoviesLoading: (state: RootState) =>
    state.postReducer.isUpcomingMoviesLoading,
  getUpcomingMoviesTotalPages: (state: RootState) =>
    state.postReducer.upcomingMoviesTotalPages,
};

export default postSlice.reducer;
