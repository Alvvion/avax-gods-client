import React from "react";
import { AlertIcon } from "../assets";
import styles from "../styles";

function Alert({ type, message }) {
  return (
    <div className={`${styles.alertContainer} ${styles.flexCenter}`}>
      <div className={`${styles.alertWrapper} ${styles[type]}`}>
        <AlertIcon type={type} />
        {message}
      </div>
    </div>
  );
}

export default Alert;
