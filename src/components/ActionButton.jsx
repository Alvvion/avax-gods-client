import React from "react";
import styles from "../styles";

function ActionButton({ imgUrl, handleClick, restStyles }) {
  return (
    <div
      className={`${styles.gameMoveBox} ${styles.flexCenter} ${styles.glassEffect} ${restStyles} select-none`}
      onClick={handleClick}
    >
      <img src={imgUrl} alt="action_img" className={styles.gameMoveIcon} />
    </div>
  );
}

export default ActionButton;
