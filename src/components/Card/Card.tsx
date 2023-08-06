import React, { FC } from "react";
import classNames from "classnames";

import styles from "./Card.module.scss";
import {FavoritesIcon, TrendsIcon} from "../../assets/icons";
import {CardProps} from "../../@types";


const Card: FC<CardProps> = ({
  title,
  image,
  genres,
  rating,
  isFavourite,
  isTrend,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={image} alt="filmImage" />
      </div>
        <div className={classNames(styles.rating, {
            [styles.trend]: isTrend,
        })}>
            {isTrend && <TrendsIcon width={"16"} height={"16"}/>}
            {rating}
        </div>

      <div className={styles.title}>{title}</div>
      <div className={styles.genres}>
        {genres.map((genre, index) => {
          return (
            <div key={index} className={styles.genre}>
              {genre.display_name}
            </div>
          );
        })}
      </div>
      <div className={styles.favourite}>
        <FavoritesIcon fill={"#7B61FF"} />
      </div>
    </div>
  );
};

export default Card;
