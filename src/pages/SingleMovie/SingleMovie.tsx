import React, { useEffect, useMemo, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import styles from "./SingleMovie.module.scss";
import {
  ArrowIcon,
  ArrowLeftIcon,
  FavoritesIcon,
  ShareIcon,
} from "src/assets/icons";
import Post from "src/components/Post";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieDetails,
  getRecommendations,
  MovieSelectors, setFavoriteObjectMovies,
} from "src/redux/reducers/movieSlice";
import { useParams } from "react-router-dom";
import { ACTIVE_USER_DATA, URL_IMG } from "src/utils/constants";
import { GetMovieDetails } from "src/redux/@type";
import classNames from "classnames";
import Loader from "src/components/Loader";
import Player from "src/components/Player";

export type MovieDetailType = {
  title: string;
  description: string;
};

const SingleMovie = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [copied, setCopied] = useState(false);

  const urlToCopy = window.location.href;

  const activeUser = JSON.parse(localStorage.getItem(ACTIVE_USER_DATA) || "");
  const activeUserId = activeUser.session_id;

  const singleMovie = useSelector(MovieSelectors.getMovieDetails);
  const recommendationPosts = useSelector(MovieSelectors.getRecommendations);
  const favoriteMovies = useSelector(MovieSelectors.getFavoriteMovies);

  const favouriteIndex =
    singleMovie &&
    favoriteMovies.findIndex((item) => item.id === singleMovie.id);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getMovieDetails(id));
      dispatch(getRecommendations(id));
    }
  }, [id]);

  const onFavouriteClick = (movie: GetMovieDetails) => () => {
    dispatch(setFavoriteObjectMovies({ movie, activeUserId }));
  };

  let movieDetails: MovieDetailType[] = [];
  if (singleMovie) {
    movieDetails = [
      {
        title: "Slogan",
        description: `${singleMovie.tagline}`,
      },
      {
        title: "Year",
        description: `${singleMovie.release_date.split("-")[0]}`,
      },
      {
        title: "Released",
        description: `${singleMovie.release_date}`,
      },
      {
        title: "Revenue",
        description: `${singleMovie.revenue} $`,
      },
      {
        title: "Spoken languages",
        description: `${singleMovie.spoken_languages.reduce((prev, current) => {
          if (prev === "") {
            return `${current.english_name}`;
          } else {
            return `${prev}, ${current.english_name}`;
          }
        }, "")}`,
      },
      {
        title: "Country",
        description: `${singleMovie.production_countries.reduce(
          (prev, current) => {
            if (prev === "") {
              return `${current.name}`;
            } else {
              return `${prev}, ${current.name}`;
            }
          },
          "",
        )}`,
      },
      {
        title: "Production",
        description: `${singleMovie.production_companies.reduce(
          (prev, current) => {
            if (prev === "") {
              return `${current.name}`;
            } else {
              return `${prev}, ${current.name}`;
            }
          },
          "",
        )}`,
      },
    ];
  }

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Сброс статуса "copied" через 2 секунды
  };

  const recommendationPageCount = Math.ceil(recommendationPosts.length / 3);

  const recommendationPageList = useMemo(() => {
    return recommendationPosts.filter(
      (post, index) =>
        index >= (currentPage - 1) * 3 && index < currentPage * 3,
    );
  }, [recommendationPosts, currentPage]);
  const onNextPage = () => {
    currentPage < recommendationPageCount && setCurrentPage(currentPage + 1);
  };

  const onPrevPage = () => {
    currentPage !== 1 && setCurrentPage(currentPage - 1);
  };

  return singleMovie ? (
    <div className={styles.singleMovieWrap}>
      <div className={styles.left}>
        <div className={styles.img}>
          <img src={`${URL_IMG}${singleMovie.poster_path}`} alt="poster" />
        </div>
        <div className={styles.icons}>
          <div
            className={classNames(styles.icon, {
              [styles.favoriteActive]: favouriteIndex !== -1,
            })}
            onClick={onFavouriteClick(singleMovie)}
          >
            <FavoritesIcon />
          </div>
          <CopyToClipboard text={urlToCopy} onCopy={handleCopy}>
            <div className={styles.icon}>
              <ShareIcon />
            </div>
          </CopyToClipboard>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.genres}>
          {singleMovie.genres.map((genre, index) => {
            return (
              <div key={index} className={styles.genre}>
                {genre.name}
              </div>
            );
          })}
        </div>
        <div className={styles.title}>{singleMovie.title}</div>
        <div className={styles.labels}>
          <div className={styles.rating}>
            {singleMovie.vote_average.toFixed(1)}
          </div>
          <div className={styles.imdb}>
            Vote count: {singleMovie.vote_count}
          </div>
          <div className={styles.time}>{singleMovie.runtime} min</div>
        </div>

        <div className={styles.desc}>{singleMovie.overview}</div>

        <div className={styles.details}>
          {movieDetails.map(({ title, description }, index) => {
            return (
              <div className={styles.detail} key={index}>
                <div className={styles.detailTitle}>{title}</div>
                <div>{description}</div>
              </div>
            );
          })}
        </div>
        {singleMovie && (
          <div className={styles.playerContainer}>
            <div className={styles.watchOnline}>Watch online</div>
            <div className={styles.player}>
              <Player
                title={singleMovie.original_title}
                year={Number(singleMovie.release_date.split("-")[0])}
                id={singleMovie.id}
              />
            </div>
          </div>
        )}

        <div className={styles.recommendations}>
          <div className={styles.titleContainer}>
            <div className={styles.recommendationsTitle}>Recommendations</div>
            <div className={styles.arrows}>
              <div className={styles.arrow} onClick={onPrevPage}>
                <ArrowLeftIcon />
              </div>
              <div className={styles.arrow} onClick={onNextPage}>
                <ArrowIcon />
              </div>
            </div>
          </div>

          {recommendationPageList.length > 0 ? (
            <div className={styles.recommendPosts}>
              {recommendationPageList.map(
                (
                  { id, title, popularity, poster_path, vote_average },
                  index,
                ) => {
                  return (
                    <Post
                      key={index}
                      id={id}
                      popularity={popularity}
                      poster_path={poster_path}
                      title={title}
                      vote_average={vote_average}
                    />
                  );
                },
              )}
            </div>
          ) : (
            <div className={styles.recommendPosts}>No recommendations</div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default SingleMovie;
