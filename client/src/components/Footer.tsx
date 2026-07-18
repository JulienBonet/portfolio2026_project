import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL;

export default function Footer() {
  const [mailHovered, setMailHovered] = useState(false);
  const [githubHovered, setGithubHovered] = useState(false);
  const [linkedinHovered, setLinkedinHovered] = useState(false);

  return (
    <Box
      component="footer"
      sx={{
        height: "50px",
        backgroundColor: "var(--color-02)",
        borderTop: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: {xs: "center", sm: "space-between"},
        px: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "1em",
        }}
      >
        © 2026 | Julien Bonet
      </Typography>

      <Stack direction="row" spacing={3}
      sx={{
        display: {xs: 'none', sm: 'flex'}
      }}>
        <Stack
          component="a"
          href={`mailto:${CONTACT_EMAIL}`}
          spacing={2}
          sx={{
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            component="img"
            src={mailHovered ? "/images/courrier_footer_hov.png" : "/images/courrier_footer.png"}
            alt="Envoyer un mail"
            onMouseEnter={() => setMailHovered(true)}
            onMouseLeave={() => setMailHovered(false)}
            sx={{
              width: 30,
              cursor: "pointer",
            }}
          />
        </Stack>
        <Stack
          component="a"
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          spacing={2}
          sx={{
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            component="img"
            src={githubHovered ? "/images/github_footer_hov.png" : "/images/github_footer.png"}
            alt="GitHub"
            onMouseEnter={() => setGithubHovered(true)}
            onMouseLeave={() => setGithubHovered(false)}
            sx={{
              width: 30,
              cursor: "pointer",
            }}
          />
        </Stack>

        <Stack
          component="a"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          spacing={2}
          sx={{
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            component="img"
            src={linkedinHovered ? "/images/linkedin_foot_hov.png" : "/images/linkedin_foot.png"}
            alt="GitHub"
            onMouseEnter={() => setLinkedinHovered(true)}
            onMouseLeave={() => setLinkedinHovered(false)}
            sx={{
              width: 30,
              cursor: "pointer",
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
