import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import HomePage from "@/pages/HomePage";
import LegalPage from "@/pages/LegalPage";
import PrivacyPage from "@/pages/PrivacyPage";

export const router =
  createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "mentions-legales",
          element: <LegalPage />,
        },
        {
          path: "politique-confidentialite",
          element: <PrivacyPage />,
        },
      ],
    },
  ]);