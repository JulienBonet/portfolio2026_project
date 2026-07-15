import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import "@/assets/css/reset.css";
import "@/assets/css/variables.css";
import "@/assets/css/common.css";

import { router } from "@/router/router";

createRoot(
  document.getElementById("root")!,
).render(
  <StrictMode>
    <RouterProvider
      router={router}
    />
  </StrictMode>,
);
