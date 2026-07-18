import { AppBar, Box, Toolbar } from "@mui/material";

import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: "50px",
        backgroundColor: "var(--color-02)",
        borderBottom: "1px solid black",
      }}
    >
      <Toolbar
        sx={{
          height: "50px",
          minHeight: "50px !important",
          justifyContent: "space-between",
          px: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Box
          component="img"
          src="/images/jbDev_logo.png"
          alt="JB Dev"
          sx={{
            height: 40,
            objectFit: "contain",
          }}
        />

        <DesktopNavigation />

        <MobileNavigation />

      </Toolbar>
    </AppBar>
  );
}