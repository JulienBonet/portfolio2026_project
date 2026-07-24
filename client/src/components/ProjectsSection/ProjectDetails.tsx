import { Box, Grid, Stack, Typography } from "@mui/material";

import type { ProjectDetail } from "@/types/project";

import ProjectTechnologyGroup from "./ProjectTechnologyGroup";

import ProjectVisual from "./ProjectVisual";

import "../../assets/css/richText.css";

type Props = {
  project: ProjectDetail;
};

export default function ProjectDetails({ project }: Props) {
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={3}>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "1.5em", md: "2em" },
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
              <ProjectTechnologyGroup technologies={project.technologies} />
            </Stack>
          </Box>

          <Box>
            <Typography
              sx={{
                mb: 2,
                fontSize: { xs: "1.5em", md: "2em" },
                fontWeight: 500,
              }}
            >
              Infos Projet
            </Typography>

            <Box
              className="rich-text-content"
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
            width: { xs: "100%", md: "85%" },
          }}
        >
          <ProjectVisual project={project} />
        </Box>
      </Grid>
    </Grid>
  );
}
