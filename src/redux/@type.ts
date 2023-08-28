export type PayloadWithDataAndCallback<Data> = {
  data: Data;
  callback: () => void;
};

// export type PaginationDataType = {
//   id: number;
//   name: string;
//   release_date: string;
//   year: string;
//   tagline: string;
//   poster: string;
//   backdrop: string;
//   runtime: number;
//   budget: number;
//   revenue: number;
//   popularity: number;
//   tmdb_id: number;
//   imdb_id: string;
//   is_series: boolean;
//   adult: boolean;
//   season_count: number;
//   episode_count: number;
//   series_ended: boolean;
//   language: string;
//   original_title: string;
//   certification: string;
//   rating: string;
//   vote_count: number;
// };

// export type PaginationType = {
//   current_page: number;
//   from: number;
//   to: number;
//   per_page: number;
//   last_page: number;
//   total: number;
//   data: PaginationDataType[];
// };

// export type GetPostsResponse = {
//   status: string;
//   pagination: PaginationType;
// };

export type SignUpUserData = {
  email: string;
  password: string;
  token_name: string;
};

export type SignUpUserDataPayload = PayloadWithDataAndCallback<SignUpUserData>;

export type SignUpResponseData = {
  status: string;
  user: {
    id: number;
    display_name: string;
    avatar: string;
    first_name: string;
    last_name: string;
    gender: string;
  };
};

export type SignInUserData = {};

export type SigInUserDataPayload = PayloadWithDataAndCallback<SignInUserData>;

export type CreateRequestTokenResponse = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

export type CreateSessionData = { request_token: string };

export type CreateSessionPayloadData =
  PayloadWithDataAndCallback<CreateSessionData>;

export type CreateSessionResponseData = {
  success: boolean;
  session_id: string;
};

export type UserListType = {
  username: string;
  password: string;
  email: string;
  isLoggedIn: boolean;
  session_id: string;
};

export type PostProps = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type PostListProps = PostProps[];

export type GetPostsResponse = {
  page: number;
  results: PostListProps;
  total_pages: number;
};

export type GetPostsPayload = {
  page: number;
  isOverwrite: boolean;
};

export type SetPostsPayload = {
  postList: PostListProps;
  isOverwrite: boolean;
};

export type GenreType = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type SpokenLanguages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type GetPostDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: GenreType[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    },
  ];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type GenresData = {
  id: number;
  name: string;
};

export type GenresResponse = {
  genres: GenresData[];
};

export type FavoriteTypes = GetPostDetails[];

export type FavoriteObjectsTypes = {
  user: string;
  movies: FavoriteTypes;
};

export type SearchPayload = {
  page: number;
  query: string;
  isOverwrite: boolean;
};

export type SearchResponse = {
  page: number;
  results: PostProps[];
  total_pages: number;
  total_results: number;
};

export type SetSearchedPostsPayload = {
  postList: PostListProps;
  isOverwrite: boolean;
  total_pages: number;
};

export type GetFilterPayload = {
  page: number;
  isOverwrite: boolean;
  sort_by: string;
  with_genres?: string;
  region?: string;
  release_date_from?: string;
  release_date_to?: string;
  vote_average_from?: string;
  vote_average_to?: string;
  vote_average?: string;
  vote_count?: string;
};

export type RegionData = {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
};

export type RegionsResponse = {
  results: RegionData[];
};

export type UpcomingResponse = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: PostProps[];
  total_pages: number;
  total_results: number;
};

// export type AccountDetailsData = {
//   session_id: string;
// };
//
// export type AccountDetailsResponseData = {
//   avatar: {
//     gravatar: {
//       hash: string;
//     };
//     tmdb: {
//       avatar_path: string | null;
//     };
//   };
//   id: number;
//   iso_639_1: string;
//   iso_3166_1: string;
//   name: string;
//   include_adult: boolean;
//   username: string;
// };
