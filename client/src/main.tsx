import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import "@/assets/css/reset.css";
import "@/assets/css/variables.css";
import "@/assets/css/common.css";

import { router } from "@/router/router";

import {
  ThemeProvider,
} from "@mui/material/styles";

import {
  theme,
} from "@/theme/theme";

createRoot(
  document.getElementById("root")!,
).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
