import { useEffect, useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { getTechnologiesFeatured } from "@/api/technologies.api";

import TechnologyGroup from "./TechnologyGroup";

import type { Technology } from "@/types/technology";

export default function TechnologiesBlock() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  useEffect(() => {
    async function loadTechnologies() {
      try {
        const data = await getTechnologiesFeatured();
        setTechnologies(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadTechnologies();
  }, []);

  const frontend = technologies.filter((tech) => tech.category === "frontend");

  const backend = technologies.filter((tech) => tech.category === "backend");

  const devops = technologies.filter((tech) => tech.category === "devops");

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

      <TechnologyGroup technologies={frontend} />

      <Divider
        sx={{
          width: "100%",
        }}
      />

      <Typography
        variant="h3"
        sx={{
          display: {xs: "block", md:"none"},
          fontSize: {
            xs: "1.5em",
            md: "2em",
          },
          fontWeight: 500,
        }}
      >
        Back-end
      </Typography>

      <Stack direction="row" spacing={4}>
        <TechnologyGroup technologies={backend} />

        <TechnologyGroup technologies={devops} />
      </Stack>

      <Typography
        variant="h3"
        sx={{
          display: {xs: "none", md:"block"},
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
