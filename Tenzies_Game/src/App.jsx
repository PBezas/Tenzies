import { useState, useEffect } from "react";
import Die from "./Die";
import Timer from "./Timer";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [rolls, setRolls] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld);
    const allDiceSame = dice.every((die) => die.value === dice[0].value);

    if (allDiceHeld && allDiceSame) {
      setHasWon(true);
      console.log("you win!");
    } else {
      console.log("try again!");
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }

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
        <h1>Tenzies</h1>
        {!hasWon ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <p className="instructions">
              Roll until all dice have the same value. Click each die to freeze
              it at its current value between rolls.
            </p>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "space-between",
                mt: "1rem",
              }}
            >
              {dice.map((die) => (
                <Die
                  key={die.id}
                  isHeld={die.isHeld}
                  holdDie={() => holdDie(die.id)}
                >
                  {die.value}
                </Die>
              ))}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              color: "#57cc99",
              mt: "2rem",
              mb: "6.3rem",
            }}
          >
            <h2 style={{ fontSize: "2.5rem", margin: "0.5rem" }}>
              Congratulations!
            </h2>
            <h2 style={{ fontSize: "2.5rem", margin: "0.5rem" }}>You won!</h2>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            mt: "1rem",
          }}
        >
          <Typography variant="h6">{`You have rolled ${rolls} times`}</Typography>
          <Timer rolls={rolls} hasWon={hasWon} />
        </Box>
        <Button
          variant="contained"
          onClick={rollDice}
          sx={{ mt: "1rem", width: "8rem" }}
        >
          {hasWon ? "New Game" : "Roll"}
        </Button>
      </div>
    </div>
  );
}
