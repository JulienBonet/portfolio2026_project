import { useEffect, useState } from "react";

import { Box, Stack, Container, Typography } from "@mui/material";

import { getProjects } from "@/api/projects.api";

import ProjectCard from "./ProjectCard";

import type { Project } from "@/types/project";

import CircularProgress from "@mui/material/CircularProgress";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);

        const data = await getProjects();

        setProjects(data);
        setError(null);
      } catch (err) {
        console.error(err);

        setError("Impossible de charger les projets.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "calc(100vh - 100px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

if (error) {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "calc(100vh - 100px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>
        {error}
      </Typography>
    </Box>
  );
}

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        scrollMarginTop: "70px",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "var(--color-00)",
          border: "solid 1px black",
          borderRadius: "50px",
          padding: "2rem 0",
          pb: "3rem",
          width: "90%",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: {
              xs: "2em",
              md: "3em",
            },
            textAlign: "center",
            fontWeight: 400,
            mb: "2rem",
          }}
        >
          PROJETS
        </Typography>
        <Stack spacing={4}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
