import {
  createTheme,
} from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",

    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },

    text: {
      primary: "#111111",
      secondary: "#666666",
    },
  },

  typography: {
    fontFamily: [
      "Jost Variable",
      "sans-serif",
    ].join(","),
  },

  shape: {
    borderRadius: 8,
  },
});