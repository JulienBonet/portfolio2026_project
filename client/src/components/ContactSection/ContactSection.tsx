import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";

const CONTACT_EMAIL = "contact@julienbonet.fr";
const GITHUB_URL = "https://github.com/JulienBonet";

export default function ContactSection() {
  const [mailHovered, setMailHovered] = useState(false);
  const [githubHovered, setGithubHovered] = useState(false);

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        minHeight: "calc(100vh - 100px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "var(--color-00)",
          border: "1px solid black",
          borderRadius: "50px",
          py: { xs: 5, md: "5rem" },
          px: 4,
          justifyContent: "center",
          width: "90%",
        }}
      >
        <Stack spacing={4} sx={{}}>
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "2em",
                md: "3em",
              },
              textAlign: "center",
              fontWeight: 400,
            }}
          >
            CONTACT
          </Typography>
          <Box
            sx={{
              border: "1px dashed black",
              borderRadius: "16px",
              p: 4,
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={8}
              sx={{
                justifyContent: "space-evenly",
                alignItems: "center",
                
              }}
            >
              {/* MAIL */}

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
                  src={mailHovered ? "/images/courrier_hov.png" : "/images/courrier.png"}
                  alt="Envoyer un mail"
                  onMouseEnter={() => setMailHovered(true)}
                  onMouseLeave={() => setMailHovered(false)}
                  sx={{
                    width: 120,
                    cursor: "pointer",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    textAlign: "center",
                  }}
                >
                  Envoyer un mail
                </Typography>
              </Stack>

              {/* GITHUB */}

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
                  src={githubHovered ? "/images/github-logo2_hov.png" : "/images/github-logo2.png"}
                  alt="GitHub"
                  onMouseEnter={() => setGithubHovered(true)}
                  onMouseLeave={() => setGithubHovered(false)}
                  sx={{
                    width: 120,
                    cursor: "pointer",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    textAlign: "center",
                  }}
                >
                  Mon GitHub
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
