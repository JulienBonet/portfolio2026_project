import { Button, Stack } from "@mui/material";

export default function DesktopNavigation() {

  const navButtonSx = { color: "white", textTransform: "none", fontSize: "larger", }

  return (
    <Stack
      direction="row"
      spacing={{
        md: 3,
      }}
      sx={{
        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      <Button href="#presentation" sx={navButtonSx}>
        PORTFOLIO
      </Button>

      <Button href="#projects" sx={navButtonSx}>
        PROJECTS
      </Button>

      <Button href="#contact" sx={navButtonSx}>
        CONTACT
      </Button>
    </Stack>
  );
}