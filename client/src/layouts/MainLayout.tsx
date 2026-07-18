import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />

      <Box
        component="main"
        sx={{
          pt: "50px",
          pb: "50px"
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </>
  );
}
