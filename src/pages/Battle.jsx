import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { Alert, PlayerInfo, GameInfo, ActionButton, Card } from "../components";
import styles from "../styles";
import {
  attack,
  attackSound,
  defense,
  defenseSound,
  player01 as player1Icon,
  player02 as player2Icon,
} from "../assets";

import { playAudio } from "../utils/animation.js";

function Battle() {
  const {
    contract,
    gameData,
    walletAddress,
    showAlert,
    setShowAlert,
    navigate,
    battleground,
    setErrorMessage,
    player1Ref,
    player2Ref,
  } = useGlobalContext();
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const { battleName } = useParams();

  useEffect(() => {
    const getPlayerInfo = async () => {
      let player1Address = null;
      let player2Address = null;
      try {
        if (
          gameData.activeBattle.players[0].toLowerCase() ===
          walletAddress.toLowerCase()
        ) {
          player1Address = gameData.activeBattle.players[0];
          player2Address = gameData.activeBattle.players[1];
        } else {
          player1Address = gameData.activeBattle.players[1];
          player2Address = gameData.activeBattle.players[0];
        }

        const p1TokenData = await contract.getPlayerToken(player1Address);
        const player01 = await contract.getPlayer(player1Address);
        const player02 = await contract.getPlayer(player2Address);

        const p1Att = p1TokenData.attackStrength.toNumber();
        const p1Def = p1TokenData.defenseStrength.toNumber();
        const p1H = player01.playerHealth.toNumber();
        const p1M = player01.playerMana.toNumber();

        const p2H = player02.playerHealth.toNumber();
        const p2M = player02.playerMana.toNumber();
        setPlayer1({
          ...player01,
          att: p1Att,
          def: p1Def,
          health: p1H,
          mana: p1M,
        });
        setPlayer2({
          ...player02,
          att: "X",
          def: "X",
          health: p2H,
          mana: p2M,
        });
      } catch (err) {
        setErrorMessage(err);
      }
    };

    if (contract && gameData.activeBattle) getPlayerInfo();
  }, [contract, gameData, battleName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!gameData?.activeBattle) navigate("/");
    }, [2000]);

    return () => clearTimeout(timer);
  }, []);

  const makeAMove = async (choice) => {
    playAudio(choice === 1 ? attackSound : defenseSound);

    try {
      await contract.attackOrDefendChoice(choice, battleName);

      setShowAlert({
        status: true,
        type: "info",
        message: `Initiating ${choice === 1 ? "attack" : "defense"}`,
      });
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div
      className={`${styles.flexBetween} ${styles.gameContainer} ${battleground}`}
    >
      {showAlert?.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
      <PlayerInfo player={player2} playerIcon={player2Icon} mt />
      <div className={`${styles.flexCenter} flex-col my-10`}>
        <Card
          card={player2}
          title={player2?.playerName}
          cardRef={player1Ref}
          playerTwo
        />
        <div className="flex items-center flex-row">
          <ActionButton
            imgUrl={attack}
            handleClick={() => makeAMove(1)}
            restStyles="mr-2 hover:border-yellow-400"
          />
          <Card
            card={player1}
            title={player1?.playerName}
            cardRef={player2Ref}
            restStyles="mt-3"
          />
          <ActionButton
            imgUrl={defense}
            handleClick={() => makeAMove(2)}
            restStyles="ml-6 hover:border-red-600"
          />
        </div>
      </div>
      <PlayerInfo player={player1} playerIcon={player1Icon} mt />
      <GameInfo />
    </div>
  );
}

export default Battle;
