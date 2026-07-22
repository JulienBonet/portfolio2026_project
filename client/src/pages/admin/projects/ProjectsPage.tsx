import {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import {
  useNavigate,
} from "react-router-dom";

import {
  getAdminProjects,
  deleteProject,
} from "@/api/projects.api";

import type {
  Project,
} from "@/types/project";

import ProjectTable from "./ProjectTable";

import LoadingBlock from "@/components/common/LoadingBlock";
import AppSnackbar from "@/components/common/AppSnackbar";

export default function ProjectsPage() {
  const navigate =
    useNavigate();

  const [
    projects,
    setProjects,
  ] = useState<Project[]>(
    [],
  );

  console.log("projects", projects)

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    selectedProject,
    setSelectedProject,
  ] = useState<Project | null>(
    null,
  );

  const [
    snackbar,
    setSnackbar,
  ] = useState({
    open: false,
    message: "",
    severity:
      "success" as
        | "success"
        | "error",
  });

  async function load() {
    try {
      setLoading(true);

      const data =
        await getAdminProjects();

      setProjects(data);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete() {
    if (!selectedProject) {
      return;
    }

    try {
      await deleteProject(
        selectedProject.id,
      );

      await load();

      setSnackbar({
        open: true,
        message:
          "Projet supprimé",
        severity:
          "success",
      });

      setSelectedProject(
        null,
      );

    } catch {
      setSnackbar({
        open: true,
        message:
          "Suppression impossible",
        severity: "error",
      });
    }
  }

  if (loading) {
    return (
      <LoadingBlock />
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Projets
        </Typography>

        <Button
          variant="contained"
          onClick={() =>
            navigate(
              "/admin/projects/new",
            )
          }
        >
          Ajouter
        </Button>
      </Box>

      {projects.length ===
      0 ? (
        <Typography>
          Aucun projet
          enregistré.
        </Typography>
      ) : (
        <ProjectTable
          projects={
            projects
          }
          onEdit={(id) =>
            navigate(
              `/admin/projects/${id}/edit`,
            )
          }
          onDelete={(
            project,
          ) =>
            setSelectedProject(
              project,
            )
          }
        />
      )}

      <Dialog
        open={
          !!selectedProject
        }
        onClose={() =>
          setSelectedProject(
            null,
          )
        }
      >
        <DialogTitle>
          Supprimer le
          projet
        </DialogTitle>

        <DialogContent>
          Voulez-vous
          vraiment
          supprimer "
          {
            selectedProject?.title
          }
          " ?
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setSelectedProject(
                null,
              )
            }
          >
            Annuler
          </Button>

          <Button
            color="error"
            onClick={
              handleDelete
            }
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <AppSnackbar
        open={
          snackbar.open
        }
        message={
          snackbar.message
        }
        severity={
          snackbar.severity
        }
        onClose={() =>
          setSnackbar(
            (
              previous,
            ) => ({
              ...previous,
              open: false,
            }),
          )
        }
      />
    </Box>
  );
}