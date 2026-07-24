import { Box, Stack, Typography } from "@mui/material";

import Divider from "@mui/material/Divider";

import type { ProjectDetail } from "@/types/project";

import ProjectTechnologyGroup from "./ProjectTechnologyGroup";

import ProjectVisual from "./ProjectVisual";

import "../../assets/css/richText.css";

type Props = {
  project: ProjectDetail;
};

export default function ProjectDetails({ project }: Props) {
  return (
    <Stack spacing={3}>
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
              fontSize: { xs: "1.5em", md: "2em", lg:"2.5em" },
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
      <Divider sx={{ width: "100%" }} />
      <Stack spacing={3} sx={{ width: "100%", alignItems: "center" }}>
        <Box sx={{ width: { xs: "100%", md: "60%"} }}>
          <ProjectVisual project={project} />
        </Box>
      </Stack>
    </Stack>
  );
}
