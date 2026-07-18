import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import TechnologiesBlock from "./TechnologiesBlock/TechnologiesBlock";
import AboutMeBlock from "./AboutMeBlock";

export default function PresentationSection() {
  return (
    <Stack
      component="section"
      id="presentation"
      sx={{
        minHeight: {
          xs: "auto",
          md: "calc(100vh - 100px)",
        },
        scrollMarginTop: "70px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          border: "solid 1px black",
          borderRadius: "50px",
          my: "2rem",
          mb: "4rem",
          padding: "1rem 0",
          width: "90%",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            height: "100%",
            p: 2,
          }}
        >
          {/* Zone 1 */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2em",
                    md: "4em",
                  },
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                JULIEN BONET
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "1.5em",
                    md: "2em",
                  },
                  textAlign: "center",
                }}
              >
                Développeur Web Full Stack
              </Typography>
            </Stack>
          </Grid>

          {/* Zone 2 */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="/images/JBONET-portrait.png"
              alt="portrait Julien Bonet"
              sx={{
                width: 220,
                objectFit: "cover",
              }}
            />
          </Grid>

          {/* Zone 3 */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TechnologiesBlock />
          </Grid>

          {/* Zone 4 */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AboutMeBlock />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}
