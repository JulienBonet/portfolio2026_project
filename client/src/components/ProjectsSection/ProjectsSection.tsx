import { useEffect, useState } from "react";

import { Box, Stack, Container, Typography } from "@mui/material";

import { getProjects } from "@/api/projects.api";

import ProjectCard from "./ProjectCard";

import type { Project } from "@/types/project";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  console.log(projects);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProjects();
  }, []);

  return (
    <Box component="section">
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "var(--color-00)",
          border: "solid 1px black",
          borderRadius: "50px",
          padding: "2rem 0",
          pb: "3rem",
          width: "90%"
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
        <Stack spacing={3}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
