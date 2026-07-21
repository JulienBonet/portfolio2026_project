import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";

import HomePage from "@/pages/HomePage";
import LegalPage from "@/pages/LegalPage";
import PrivacyPage from "@/pages/PrivacyPage";

import ProtectedRoute from "@/router/ProtectedRoute";

import LoginPage from "@/pages/admin/LoginPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import TechnologiesPage from "@/pages/admin/technologies/technologiesPage";
import TechnologyCreatePage from "@/pages/admin/technologies/TechnologyCreatePage";
import TechnologyEditPage from "@/pages/admin/technologies/TechnologyEditPage";

export const router = createBrowserRouter([
  // Site public
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

  // Login admin (sans protection)
  {
    path: "/admin/login",
    element: <LoginPage />,
  },

  // Back-office admin
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "technologies",
            element: <TechnologiesPage />,
          },
          {
            path: "technologies/new",
            element: <TechnologyCreatePage />,
          },
          {
            path: "technologies/:id/edit",
            element: <TechnologyEditPage />,
          },
        ],
      },
    ],
  },
]);
