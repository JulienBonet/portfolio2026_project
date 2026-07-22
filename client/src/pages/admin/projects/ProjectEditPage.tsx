import {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Typography,
} from "@mui/material";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getAdminProjectById,
} from "@/api/projects.api";

import LoadingBlock from "@/components/common/LoadingBlock";

import type {
  ProjectDetail,
} from "@/types/project";

import ProjectForm from "./ProjectForm";

export default function ProjectEditPage() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [project, setProject] =
    useState<ProjectDetail | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getAdminProjectById(
            Number(id),
          );

        setProject(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <LoadingBlock />
    );
  }

  if (!project) {
    return (
      <Typography>
        Projet introuvable
      </Typography>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Modifier un projet
      </Typography>

      <ProjectForm
        project={project}
        onSuccess={() =>
          navigate(
            "/admin/projects",
          )
        }
      />
    </Box>
  );
}