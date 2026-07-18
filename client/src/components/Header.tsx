import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";

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
          display: "flex",
          justifyContent: "space-between",
          px: {
            xs: 2,
            md: 4,
          },
        }}
      >
        {/* Logo */}

        <Box
          component="img"
          src="/images/jbDev_logo.png"
          alt="JB Dev"
          sx={{
            height: 40,
            objectFit: "contain",
          }}
        />

        {/* Navigation */}

        <Stack
          direction="row"
          spacing={{
            xs: 1,
            md: 3,
          }}
        >
          <Button
            href="#presentation"
            sx={{
              color: "white",
              textTransform: "none",
              fontSize: "larger",
            }}
          >
            PORTFOLIO
          </Button>

          <Button
            href="#projects"
            sx={{
              color: "white",
              textTransform: "none",
              fontSize: "larger",
            }}
          >
            PROJECTS
          </Button>

          <Button
            href="#contact"
            sx={{
              color: "white",
              textTransform: "none",
              fontSize: "larger",
            }}
          >
            CONTACT
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
