import { useEffect } from "react";
import Typography from "@mui/material/Typography";


export default function Timer({ children, rolls, hasWon, setSeconds }) {
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

  return <Typography variant="h6">{children}</Typography>;
}
