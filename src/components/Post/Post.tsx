import React, { FC } from "react";
import classNames from "classnames";

import styles from "./Post.module.scss";
import { FavoritesIcon, TrendsIcon } from "src/assets/icons";
import {iPost, Theme} from "src/@types";
import { URL_IMG } from "src/utils/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GenreSelectors } from "src/redux/reducers/genreSlice";
import { GenresData } from "src/redux/@type";
import { MovieSelectors } from "src/redux/reducers/movieSlice";
import { useThemeContext } from "src/context/Theme";

interface PostProps extends iPost {
  isTrend?: boolean;
}

const Post: FC<PostProps> = ({
  id,
  title,
  poster_path,
  vote_average,
  genre_ids,
  isTrend,
  genres,
}) => {
  const navigate = useNavigate();

  const { themeValue } = useThemeContext();

  const allGenres: GenresData[] = useSelector(GenreSelectors.getGenres);
  const favoriteMovies = useSelector(MovieSelectors.getFavoriteMovies);
  const favouriteIndex = favoriteMovies.findIndex((item) => item.id === id);

  let postGenres: string[] = [];
  allGenres.forEach(({ id, name }) => {
    genre_ids?.forEach((genre_id) => {
      if (genre_id === id) {
        postGenres.push(name);
      }
    });
  });

  const onPostClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.image} onClick={onPostClick}>
        {poster_path !== null ? (
          <img src={`${URL_IMG}${poster_path}`} alt="filmImage" />
        ) : (
          <img src={"/NoImagePlaceholder.png"} alt={"filmImage"} />
        )}
      </div>
      <div
        className={classNames(styles.rating, {
          [styles.yellow]: vote_average >= 5.5 && vote_average < 7.5,
          [styles.orange]: vote_average >= 0 && vote_average < 5.5,
          [styles.trend]: isTrend,
        })}
      >
        {isTrend && <TrendsIcon width={"16"} height={"16"} />}
        {vote_average.toFixed(1)}
      </div>

      <div
        className={classNames(styles.title, {
          [styles.lightTitle]: themeValue === Theme.Light,
        })}
        onClick={onPostClick}
      >
        {title}
      </div>
      <div className={styles.genres}>
        <div className={styles.genres}>
          {postGenres.map((genre, index) => {
            return (
              <div key={index} className={styles.genre}>
                {genre}
              </div>
            );
          })}
          {genres &&
            genres.map((genre, index) => {
              return (
                <div key={index} className={styles.genre}>
                  {genre.name}
                </div>
              );
            })}
        </div>
      </div>
      <div
        className={classNames(styles.isNotFavorite, {
          [styles.favorite]: favouriteIndex !== -1,
        })}
      >
        <FavoritesIcon fill={"#7B61FF"} />
      </div>
    </div>
  );
};

export default Post;
