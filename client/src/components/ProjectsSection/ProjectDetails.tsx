import { Box, Grid, Stack, Typography } from "@mui/material";

import type { ProjectDetail } from "@/types/project";

import ProjectTechnologyGroup from "./ProjectTechnologyGroup";

import ProjectVisual from "./ProjectVisual";

type Props = {
  project: ProjectDetail;
};

export default function ProjectDetails({ project }: Props) {
  const frontend = project.technologies.filter((tech) => tech.category === "frontend");

  const backend = project.technologies.filter((tech) => tech.category === "backend");

  const database = project.technologies.filter((tech) => tech.category === "database");

  const devops = project.technologies.filter((tech) => tech.category === "devops");

  const design = project.technologies.filter((tech) => tech.category === "design");

  const management = project.technologies.filter((tech) => tech.category === "management");

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={3}>
          <Box>
            <Typography
              sx={{
                fontSize: {xs: "1.5em", md: "2em"},
                fontWeight: 500,
              }}
            >
              Stack Technique
            </Typography>

            <Stack
              sx={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <ProjectTechnologyGroup technologies={frontend} />

              <ProjectTechnologyGroup technologies={backend} />

              <ProjectTechnologyGroup technologies={database} />

              <ProjectTechnologyGroup technologies={devops} />

              <ProjectTechnologyGroup technologies={design} />

              <ProjectTechnologyGroup technologies={management} />
            </Stack>
          </Box>

          <Box>
            <Typography
              sx={{
                mb: 2,
                fontSize: {xs: "1.5em", md: "2em"},
                fontWeight: 500,
              }}
            >
              Infos Projet
            </Typography>

            <Box
              dangerouslySetInnerHTML={{
                __html: project.full_description,
              }}
            />
          </Box>
        </Stack>
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width:{ xs: "100%", md: "85%" },
          }}
        >
          <ProjectVisual project={project} />
        </Box>
      </Grid>
    </Grid>
  );
}
