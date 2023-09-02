import { create } from "apisauce";
import { CreateSessionData } from "src/redux/@type";

const API = create({
  baseURL: "https://api.themoviedb.org/3",
});

const createRequestToken = () => {
  return API.get(
    "/authentication/token/new",
    {},
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTdhYmVkMGQ4NGU1NzA1NWI5NThiNWQyNTU5NDk3MiIsInN1YiI6IjY0ZDI2Yzk4ODUwOTBmMDEyNWJlNGI5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8awDlVyKSQfHZkjDi9uBFknVHckIrmXXd_UZHC5Mhg",
      },
    },
  );
};

const createSession = (data: CreateSessionData) => {
  return API.post("/authentication/session/new", data, {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTdhYmVkMGQ4NGU1NzA1NWI5NThiNWQyNTU5NDk3MiIsInN1YiI6IjY0ZDI2Yzk4ODUwOTBmMDEyNWJlNGI5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8awDlVyKSQfHZkjDi9uBFknVHckIrmXXd_UZHC5Mhg",
    },
  });
};

const getMovies = (
  page: number,
  sort_by?: string,
  vote_count?: number,
  release_date_from?: string,
  release_date_to?: string,
  vote_average_from?: string,
  vote_average_to?: string,
  with_genres?: string,
  region?: string,
) => {
  return API.get(
    "/discover/movie",
    {
      page,
      language: "en-US",
      sort_by,
      "vote_count.gte": vote_count,
      region,
      "release_date.gte": release_date_from,
      "release_date.lte": release_date_to,
      with_genres,
      "vote_average.gte": vote_average_from,
      "vote_average.lte": vote_average_to,
    },
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTdhYmVkMGQ4NGU1NzA1NWI5NThiNWQyNTU5NDk3MiIsInN1YiI6IjY0ZDI2Yzk4ODUwOTBmMDEyNWJlNGI5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8awDlVyKSQfHZkjDi9uBFknVHckIrmXXd_UZHC5Mhg",
      },
    },
  );
};

const getMovieDetails = (movie_id: string) => {
  return API.get(
    `/movie/${movie_id}`,
    {},
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTdhYmVkMGQ4NGU1NzA1NWI5NThiNWQyNTU5NDk3MiIsInN1YiI6IjY0ZDI2Yzk4ODUwOTBmMDEyNWJlNGI5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8awDlVyKSQfHZkjDi9uBFknVHckIrmXXd_UZHC5Mhg",
      },
    },
  );
};

const getRecommendations = (movie_id: string) => {
  return API.get(
    `/movie/${movie_id}/recommendations`,
    {},
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTdhYmVkMGQ4NGU1NzA1NWI5NThiNWQyNTU5NDk3MiIsInN1YiI6IjY0ZDI2Yzk4ODUwOTBmMDEyNWJlNGI5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8awDlVyKSQfHZkjDi9uBFknVHckIrmXXd_UZHC5Mhg",
      },
    },
  );
};

const getGenres = () => {
  return API.get(
    `/genre/movie/list`,
    {},
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTdhYmVkMGQ4NGU1NzA1NWI5NThiNWQyNTU5NDk3MiIsInN1YiI6IjY0ZDI2Yzk4ODUwOTBmMDEyNWJlNGI5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8awDlVyKSQfHZkjDi9uBFknVHckIrmXXd_UZHC5Mhg",
      },
    },
  );
};

const getTrends = (page: number) => {
  return API.get(
    `/trending/movie/week`,
    { page },
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTdhYmVkMGQ4NGU1NzA1NWI5NThiNWQyNTU5NDk3MiIsInN1YiI6IjY0ZDI2Yzk4ODUwOTBmMDEyNWJlNGI5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8awDlVyKSQfHZkjDi9uBFknVHckIrmXXd_UZHC5Mhg",
      },
    },
  );
};

const getSearch = (page: number, query: string) => {
  return API.get(
    `/search/movie`,
    { page, query },
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTdhYmVkMGQ4NGU1NzA1NWI5NThiNWQyNTU5NDk3MiIsInN1YiI6IjY0ZDI2Yzk4ODUwOTBmMDEyNWJlNGI5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8awDlVyKSQfHZkjDi9uBFknVHckIrmXXd_UZHC5Mhg",
      },
    },
  );
};

const getRegions = () => {
  return API.get(
    `/watch/providers/regions`,
    {},
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTdhYmVkMGQ4NGU1NzA1NWI5NThiNWQyNTU5NDk3MiIsInN1YiI6IjY0ZDI2Yzk4ODUwOTBmMDEyNWJlNGI5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8awDlVyKSQfHZkjDi9uBFknVHckIrmXXd_UZHC5Mhg",
      },
    },
  );
};

const getUpcomingMovies = (page: number) => {
  return API.get(
    "/movie/upcoming",
    { page },
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTdhYmVkMGQ4NGU1NzA1NWI5NThiNWQyNTU5NDk3MiIsInN1YiI6IjY0ZDI2Yzk4ODUwOTBmMDEyNWJlNGI5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8awDlVyKSQfHZkjDi9uBFknVHckIrmXXd_UZHC5Mhg",
      },
    },
  );
};

export default {
  createRequestToken,
  createSession,
  getMovies,
  getMovieDetails,
  getRecommendations,
  getGenres,
  getTrends,
  getSearch,
  getRegions,
  getUpcomingMovies,
};
