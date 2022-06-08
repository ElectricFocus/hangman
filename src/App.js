import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";
import gameData from "./data";

// Images!
import img0 from "../imgs/img_0.png"; // No guess
import img1 from "../imgs/img_1.png"; // 1 guess
import img2 from "../imgs/img_2.png"; // 2 guess
import img3 from "../imgs/img_3.png";
import img4 from "../imgs/img_4.png";
import img5 from "../imgs/img_5.png";
import img6 from "../imgs/img_6.png"; // 6 guess (you lost!)

const HANGMAN_IMG_ARRAY = [img0, img1, img2, img3, img4, img5, img6];

const GAME_STATE = {
  PLAYING: "PLAYING",
  WIN: "WON",
  LOST: "LOST"
};

/**
 * Main APP Balow
 *
 */

export default function App() {
  const [wrongGuessCount, setWrongGuessCount] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.PLAYING);
  const [gameNumber, setGameNumber] = useState(0);
  const currentGame = gameData[gameNumber];

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const onKeyPressHandler = (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      // This is an a-z code, we need to track it in the entered keys
      console.log(e.key);
      if (!guessedLetters.includes(e.key.toLowerCase())) {
        const newGuessedLetters = guessedLetters;
        newGuessedLetters.push(e.key.toLowerCase());
        setGuessedLetters(newGuessedLetters);
        forceUpdate();
      }
    }
  };

  console.log(
    "Need to cal new wrong guess count",
    guessedLetters,
    currentGame.target
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyPressHandler);
  });

  const renderTargetWord = (letter) => {
    if (letter === " ") {
      return " --- ";
    } else {
      if (guessedLetters.includes(letter.toLowerCase())) {
        return letter + " ";
      }
      return "_ ";
    }
  };

  const resetGame = () => {
    setGameState(GAME_STATE.PLAYING);
    setWrongGuessCount(0);
  };

  let winLoseText = null;

  if (gameState === GAME_STATE.WIN || gameState === GAME_STATE.LOST) {
    winLoseText = (
      <div className="game-state-display" onClick={() => resetGame()}>
        <h1>{`You've ${gameState}!`}</h1>
        <h2>Click here to play again!</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Hang Man...</h1>
      <h2>Guess the word?</h2>
      <div className="board">
        <img
          alt="hangman-board"
          src={HANGMAN_IMG_ARRAY[wrongGuessCount]}
          onClick={() => {
            // Tempoary for testing
            let newGuessCount = wrongGuessCount + 1;
            if (newGuessCount === HANGMAN_IMG_ARRAY.length - 1) {
              setGameState(GAME_STATE.LOST);
            } else if (newGuessCount > HANGMAN_IMG_ARRAY.length - 1) {
              setGameState(GAME_STATE.PLAYING);
              newGuessCount = 0;
            }
            setWrongGuessCount(newGuessCount);
          }}
        />
      </div>
      {winLoseText}
      <div className="current-word-display">
        {currentGame.target.split("").map(renderTargetWord)}
      </div>
    </div>
  );
}
