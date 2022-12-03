import React from "react";
import { useGlobalContext } from "../context";
import CustomButton from "./CustomButton";
import { player01, player02 } from "../assets";
import styles from "../styles";

function GameLoad() {
  const { walletAddress, navigate } = useGlobalContext();
  return (
    <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
      <div className={styles.gameLoadBtnBox}>
        <CustomButton
          title="Choose Battleground"
          handleClick={() => navigate("battleground")}
          restStyles="mt-6"
        />
      </div>
      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <h1
          className={`${styles.headText} text-center select-none`}
          draggable="false"
        >
          Waiting for a <br /> worthy opponent...
        </h1>
        <p className={`${styles.gameLoadText} select-none`}>
          Protip: While waiting, choose your preferred battleground
        </p>
        <div className={styles.gameLoadPlayersBox}>
          <div className={`${styles.flexCenter} flex-col`}>
            <img
              src={player01}
              alt="Player 1"
              className={styles.gameLoadPlayerImg}
            />
            <p className={`${styles.gameLoadPlayerText} select-none`}>
              {walletAddress.slice(0, 30)}
            </p>
          </div>
          <h2 className={`${styles.gameLoadVS} select-none`}>V/s</h2>
          <div className={`${styles.flexCenter} flex-col`}>
            <img
              src={player02}
              alt="Player 2"
              className={styles.gameLoadPlayerImg}
            />
            <p className={`${styles.gameLoadPlayerText} select-none`}>
              ????????
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameLoad;
