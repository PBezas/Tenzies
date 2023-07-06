import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

export default function Timer({ rolls, hasWon }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId = null;

    if (!hasWon) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    if (!hasWon && rolls === 0) {
      setSeconds(0);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [rolls, hasWon]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Typography variant="h6">Time ellapsed: {formatTime(seconds)}</Typography>
  );
}
