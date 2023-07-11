import { nanoid } from "nanoid";

import dice1 from "./images/Dice1.png";
import dice2 from "./images/Dice2.png";
import dice3 from "./images/Dice3.png";
import dice4 from "./images/Dice4.png";
import dice5 from "./images/Dice5.png";
import dice6 from "./images/Dice6.png";

export function generateNewDie() {
  return {
    value: Math.floor(Math.random() * 6),
    id: nanoid(),
    faces: [dice1, dice2, dice3, dice4, dice5, dice6],
    isHeld: false,
  };
}

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};


