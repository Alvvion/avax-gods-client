import React from "react";
import Tilt from "react-parallax-tilt";
import styles from "../styles";
import { allCards } from "../assets";

const genRandCards = () =>
  allCards[Math.floor(Math.random() * (allCards.length - 1))];

const img1 = genRandCards();
const img2 = genRandCards();

function Card({ card, title, restStyles, cardRef, playerTwo }) {
  return (
    <Tilt>
      <div
        ref={cardRef}
        className={`${styles.cardContainer} ${restStyles} select-none`}
      >
        <img
          src={playerTwo ? img2 : img1}
          alt="card"
          className={styles.cardImg}
          draggable="false"
        />
        <div
          className={`${styles.cardPointContainer} sm:left-[21.2%] left-[22%] ${styles.flexCenter}`}
        >
          <p className={`${styles.cardPoint} text-yellow-400 select-none`}>
            {card.att}
          </p>
        </div>
        <div
          className={`${styles.cardPointContainer} right-[15%] sm:right-[14.2%] ${styles.flexCenter}`}
        >
          <p className={`${styles.cardPoint} text-red-700 select-none`}>
            {card.def}
          </p>
        </div>
        <div className={`${styles.cardTextContainer} ${styles.flexCenter}`}>
          <p className={`${styles.cardText} select-none`}>{title}</p>
        </div>
      </div>
    </Tilt>
  );
}

export default Card;
