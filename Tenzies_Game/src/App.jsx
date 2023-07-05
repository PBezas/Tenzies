import { useState } from "react";
import Die from "./Die";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// import Typography from "@mui/material/Typography";

export default function App() {
  const [dice, setDice ] = useState()

  function allNewDice() {

  }



  return (
    <div className="container">
      <Box className="game-container" sx={{}}>
        <h1>Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <Box>
          <Die>1</Die>
        </Box>
        <Button variant="contained" sx={{ mt: "2rem" }}>
          Roll
        </Button>
      </Box>
    </div>
  );
}
