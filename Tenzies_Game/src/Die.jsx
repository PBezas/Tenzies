import Box from "@mui/material/Box";

export default function Die({ children }) {
  return (
    <Box
      sx={{
        bgcolor: "#8ecae6",
        width: "55px",
        height: "55px",
        diplay: "flex",
        flexDirection: "row",
        justifyContent: "center",
        

        border: "2px solid #93b5c4",
        borderRadius: "0.4rem",
      }}
    >
      {children}
    </Box>
  );
}
