import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Confetti from "react-confetti";
import Die from "./components/Die";

import { generateNewDie, formatTime, findMin } from "./lib";
import Timer from "./components/Timer";
import Typography from "@mui/material/Typography";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [rolls, setRolls] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [rollsHistory, setRollHistory] = useState([]);
  const [timeHistory, setTimeHistory] = useState([]);
 
  useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld);
    const allDiceSame = dice.every((die) => die.value === dice[0].value);

    if (allDiceHeld && allDiceSame) {
      setHasWon(true);
    }
  }, [dice]);

  useEffect(() => {
    if (hasWon) {
      if (!rollsHistory.includes(rolls) && rolls > 0) {
        setRollHistory((prev) => [...prev, rolls]);
      } else {
        setRollHistory((prev) => [...prev]);
      }
      if (!timeHistory.includes(seconds) && seconds > 0) {
        setTimeHistory((prev) => [...prev, seconds]);
      } else {
        setTimeHistory((prev) => [...prev]);
      }
    }
  }, [hasWon]);

  useEffect(() => {
    if (hasWon) {
      sessionStorage.setItem("rolls", JSON.stringify([...rollsHistory]));
      sessionStorage.setItem("time", JSON.stringify([...timeHistory]));
    }
  }, [hasWon, rollsHistory, timeHistory]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function holdDie(dieId) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        if (die.id === dieId) {
          return { ...die, isHeld: !die.isHeld };
        } else {
          return die;
        }
      })
    );
  }

  function rollDice() {
    if (!hasWon) {
      setRolls((prev) => prev + 1);
      setDice((prevDice) =>
        prevDice.map((die) => {
          if (die.isHeld) {
            return die;
          } else {
            return generateNewDie();
          }
        })
      );
    } else {
      setRolls(0);
      setHasWon(false);
      setDice(allNewDice());
    }
  }

  return (
    <div className="container">
      <div className="game-container">
        {hasWon && <Confetti className="confetti" />}
        <Box className="app_title">
          <h1>Tenzies</h1>
        </Box>
        {!hasWon ? (
          <Box className="app_main">
            {" "}
            <p className="instructions">
              Roll until all dice have the same value. Click each die to freeze
              it at its current value between rolls.
            </p>
            <Box className="dice_container">
              {dice?.map((die) => (
                <Die
                  key={die.id}
                  isHeld={die.isHeld}
                  holdDie={() => holdDie(die.id)}
                >
                  <img className="face" src={die.faces[die.value]}></img>
                </Die>
              ))}
            </Box>
            <Box className="app_counters">
              <Typography variant="h6">{`You have rolled ${rolls} times`}</Typography>
              <Timer rolls={rolls} hasWon={hasWon} setSeconds={setSeconds}>
                Time ellapsed: {formatTime(seconds)}
              </Timer>
            </Box>
          </Box>
        ) : (
          <Box className="app_main">
            <Box className="win_msg">
              <h3 style={{ fontSize: "2.5rem", margin: "0.5rem" }}>
                Congratulations!
              </h3>
              <h3 style={{ fontSize: "2.5rem", margin: "0.5rem" }}>You won!</h3>
            </Box>
            <Box className="win_counters">
              <p>Your rolls: {rolls}</p>
              <p>Your time: {formatTime(seconds)}</p>
              <p>Best score: {findMin(sessionStorage.getItem("rolls"))}</p>
              <p>
                Best time: {formatTime(findMin(sessionStorage.getItem("time")))}
              </p>
            </Box>
          </Box>
        )}
        <Box className="app_button">
          <button onClick={rollDice}>{hasWon ? "New Game" : "Roll"}</button>
        </Box>
      </div>
    </div>
  );
}
