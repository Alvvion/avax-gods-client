import React from "react";
import styles from "../styles";

function CustomButton({ title, restStyles, handleClick }) {
  return (
    <button
      type="button"
      className={`${restStyles} ${styles.btn}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}

export default CustomButton;
