import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [countRolls, setCountRolls] = useState(0);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        id: nanoid(),
      });
    }
    return newDice;
  }

  console.log(dice);

  return (
    <div className="container">
      <div className="game-container">
        <h1>Tenzies</h1>
        <p className="instructions">
          Roll until all dice have the same value. Click each die to freeze it
          at its current value between rolls.
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
            <Die key={die.id}>{die.value}</Die>
          ))}
        </Box>
        <Typography
          variant="h6"
          sx={{ mt: "1rem" }}
        >{`You have rolled ${countRolls} times`}</Typography>
        <Button variant="contained" sx={{ mt: "1rem", width: "8rem" }}>
          Roll
        </Button>
      </div>
    </div>
  );
}
