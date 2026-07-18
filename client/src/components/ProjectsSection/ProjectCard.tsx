import { useEffect, useState } from "react";

import { Box, Button, Collapse, Stack, Typography } from "@mui/material";

import type { Project, ProjectDetail } from "@/types/project";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { getProjectById } from "@/api/projects.api";

import ProjectDetails from "./ProjectDetails";

type Props = {
  project: Project;
};

function getProjectUrl(project: Project) {
  if (project.is_deployed && project.website_url) {
    return project.website_url;
  }

  return project.github_url;
}

function getProjectTypeLabel(type: string) {
  switch (type) {
    case "school":
      return "Projet scolaire";

    case "professional":
      return "Projet professionnel";

    case "personal":
      return "Projet personnel";

    case "hackathon":
      return "Hackathon";

    default:
      return type;
  }
}

function getProjectTypeIcon(type: string) {
  switch (type) {
    case "school":
      return "/images/scholar_ico.png";

    case "professional":
      return "/images/pro_project.png";

    case "personal":
      return "/images/personal_pjt_ico.png";

    case "hackathon":
      return "/images/hackathon.png";

    default:
      return "";
  }
}

function getProjectLogo(project: Project) {
  return project.is_deployed ? "/images/www.png" : "/images/github_logo.png";
}

function getProjectLogoHover(project: Project) {
  return project.is_deployed ? "/images/www_hov.png" : "/images/github_logo_hov.png";
}

export default function ProjectCard({ project }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);

  useEffect(() => {
    async function loadProjectDetail() {
      if (!expanded || projectDetail) {
        return;
      }

      try {
        const data = await getProjectById(project.id);
        setProjectDetail(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProjectDetail();
  }, [expanded, project.id, projectDetail]);

  return (
    <Stack sx={{ flexDirection: "column" }}>
      <Stack
        spacing={{ xs: 3, md: 0 }}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-evenly",
          alignItems: "center",
          border: "dashed 1px black",
          borderRadius: "10px 10px 0px 0px",
          padding: "1rem 0",
          mx: 2,
          backgroundColor: "var(--color-06)",
        }}
      >
        {/* Cover */}
        <Stack sx={{ width: { xs: "95%", md: "20%" }, justifyContent: "center" }}>
          <Box
            component="img"
            src={project.cover_image_url ?? ""}
            alt={project.title}
            sx={{
              width: "100%",
              objectFit: "cover",
              border: "solid 1px black",
              borderRadius: { xs: "0", md: "10px" },
            }}
          />
        </Stack>

        {/* Infos principales */}
        <Stack
          spacing={2}
          sx={{ flexDirection: "column", width: { xs: "95%", md: "50%" }, alignItems: "center" }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 500,
              fontSize: { xs: "2em", md: "3em" },
              textAlign: "center",
            }}
          >
            {project.title}
          </Typography>

          <Typography
            sx={{
              fontSize: "1em",
              border: "solid 1px black",
              borderRadius: "10px",
              padding: "5px 10px",
              backgroundColor: "var(--color-09)",
              textAlign: "center",
            }}
          >
            {project.short_description}{" "}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Box
                component="img"
                src={getProjectTypeIcon(project.project_type)}
                alt={project.project_type}
                sx={{
                  width: 30,
                  height: 30,
                }}
              />

              <Typography>{getProjectTypeLabel(project.project_type)}</Typography>
            </Stack>

            {project.duration && (
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Box
                  component="img"
                  src="/images/sablier_ico.png"
                  alt="durée"
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                />

                <Typography>{project.duration}</Typography>
              </Stack>
            )}
          </Stack>
        </Stack>

        {/* Btn Link */}
        <Stack
          sx={{ width: { xs: "95%", md: "20%" }, justifyContent: "center", alignItems: "center" }}
        >
          <Box
            component="a"
            href={getProjectUrl(project) ?? undefined}
            target="_blank"
            rel="noreferrer"
            sx={{
              display: "inline-block",
              width: "40%",
            }}
          >
            <Box
              component="img"
              src={hovered ? getProjectLogoHover(project) : getProjectLogo(project)}
              alt="project link"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              sx={{
                width: "100%",
                border: "solid 1px black",
                borderRadius: "10px",
                transition: "transform 0.2s ease",

                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Box>
        </Stack>
      </Stack>

      {/* details section*/}
      <Collapse in={expanded}>
        <Box
          sx={{
            p: 3,
            border: "dashed 1px black",
            borderTop: "none",
            borderRadius: "0px 0px 10px 10px",
            mx: 2,
          }}
        >
          {projectDetail && <ProjectDetails project={projectDetail} />}
        </Box>
      </Collapse>

      {/* toggle btn */}
      <Stack
        sx={{
          alignItems: "center",
          mt: 0,
          mx: 2,
        }}
      >
        <Button
          onClick={() => setExpanded(!expanded)}
          sx={{
            minWidth: 0,
            width: 50,
            height: 30,
            padding: 0,
            border: "1px dashed black",
            borderTop: "none",
            borderRadius: "0px 0px 10px 10px",
            backgroundColor: "var(--color-06)",
          }}
        >
          <KeyboardArrowDownIcon
            sx={{
              color: "black",
              fontSize: 40,
              transition: "transform 0.3s ease",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </Button>
      </Stack>
    </Stack>
  );
}
