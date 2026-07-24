import { useEffect, useState } from "react";

import { Divider, Stack, Typography } from "@mui/material";

import { getTechnologiesFeatured } from "@/api/technologies.api";

import TechnologyGroup from "./TechnologyGroup";

import type { Technology } from "@/types/technology";

import ErrorBlock from "../../common/ErrorBlock";

import LoadingBlock from "../../common/LoadingBlock";

export default function TechnologiesBlock() {
  const [frontendTechnologies, setFrontendTechnologies] = useState<Technology[]>([]);
  const [backendTechnologies, setBackendTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTechnologies() {
      try {
        setLoading(true);

        const [frontendData, backendData] = await Promise.all([
          getTechnologiesFeatured(["cms", "frontend", "design"]),
          getTechnologiesFeatured(["backend", "database", "devops", "management"]),
        ]);

        setFrontendTechnologies(frontendData);
        setBackendTechnologies(backendData);

        setError(null);
      } catch (error) {
        console.error(error);

        setError("Impossible de charger les technologies.");
      } finally {
        setLoading(false);
      }
    }

    loadTechnologies();
  }, []);

      if (loading) {
    return <LoadingBlock />;
  }

  if (error) {
    return (
      <ErrorBlock
        message="Impossible de charger les technologies."
      />
    );
  }

  return (
    <Stack
      spacing={3}
      sx={{
        backgroundColor: "var(--color-00)",
        border: "1px dashed black",
        borderRadius: "5px",
        width: "95%",
        padding: "1rem",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: {
            xs: "1.5em",
            md: "2em",
          },
          fontWeight: 500,
        }}
      >
        Front-end
      </Typography>

      <TechnologyGroup technologies={frontendTechnologies} />

      <Divider
        sx={{
          width: "100%",
        }}
      />

      <Typography
        variant="h3"
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          fontSize: {
            xs: "1.5em",
            md: "2em",
          },
          fontWeight: 500,
        }}
      >
        Back-end
      </Typography>

      <TechnologyGroup technologies={backendTechnologies} />

      <Typography
        variant="h3"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          fontSize: {
            xs: "1.5em",
            md: "2em",
          },
          fontWeight: 500,
        }}
      >
        Back-end
      </Typography>
    </Stack>
  );
}
