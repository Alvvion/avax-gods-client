import React, { useEffect, useState } from "react";
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

function Home() {
  const {
    contract,
    walletAddress,
    setShowAlert,
    navigate,
    setErrorMessage,
    gameData,
  } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");

  const handleClick = async () => {
    try {
      const playerExist = await contract.isPlayer(walletAddress);
      if (!playerExist) {
        await contract.registerPlayer(playerName, playerName);
        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned!`,
        });
      }
    } catch (err) {
      setShowAlert({
        status: true,
        type: "failure",
        message:
          err.code === 4001
            ? "User rejected the request"
            : "Something went wrong",
      });
      setErrorMessage(err);
    }
  };

  useEffect(() => {
    const checkPlayerToken = async () => {
      const playerExist = await contract.isPlayer(walletAddress);

      const tokenExist = await contract.isPlayerToken(walletAddress);

      if (playerExist && tokenExist) navigate("/create-battle");
    };

    if (contract) checkPlayerToken();
  }, [contract]);

  useEffect(() => {
    if (gameData.activeBattle) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    }
  }, [gameData]);

  return (
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />
      <CustomButton
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>
  );
}

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods
    <br />a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing
    <br />
    the ultimate Web3 Battle Card Game
  </>
);
