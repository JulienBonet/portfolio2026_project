import { useState } from "react";

import { Button, Divider, IconButton, Popover, Stack } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import CloseIcon from "@mui/icons-material/Close";

const links = [
  {
    label: "PORTFOLIO",
    href: "#presentation",
  },
  {
    label: "PROJECTS",
    href: "#projects",
  },
  {
    label: "CONTACT",
    href: "#contact",
  },
];

export default function MobileNavigation() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={open ? closeMenu : handleOpen}
        sx={{
          display: {
            xs: "flex",
            md: "none",
          },
          color: "white",
          transition: "transform 0.2s ease",

          "&:hover": {
            transform: "rotate(90deg)",
          },
        }}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              width: "100vw",
              maxWidth: "100vw",
              left: "0 !important",
              mt: "0 !important",

              backgroundColor: "var(--color-03)",
              color: "white",

              borderRadius: 0,
              borderTop: "1px solid rgba(255,255,255,0.35)",
              borderBottom: "1px solid black",

              boxShadow: "none",
            },
          },
        }}
      >
        <Stack
          divider={
            <Divider
              sx={{
                borderColor: "rgba(255,255,255,0.25)",
              }}
            />
          }
          sx={{
            width: "100%",
            px: 2,
          }}
        >
          {links.map((link) => (
            <Button
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              sx={{
                minHeight: 56,

                justifyContent: "center",

                color: "white",

                textTransform: "uppercase",
                letterSpacing: "0.15em",

                fontSize: "0.85rem",
                fontWeight: 500,

                "&:hover": {
                  backgroundColor: "var(--color-00)",
                  color: "black",
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
