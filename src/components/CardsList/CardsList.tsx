import React, { FC } from "react";
import { CardProps } from "../../@types";
import Card from "../Card";
import styles from "./CardsList.module.scss";

type CardList = CardProps[];

type CardsListProps = {
  cardsList: CardList;
};
const CardsList: FC<CardsListProps> = ({ cardsList }) => {
  return (
    <div className={styles.cardListContainer}>
      {cardsList.map((card, index) => {
        return (
          <Card
            key={index}
            title={card.title}
            image={card.image}
            genres={card.genres}
            rating={card.rating}
          />
        );
      })}
    </div>
  );
};

export default CardsList;
