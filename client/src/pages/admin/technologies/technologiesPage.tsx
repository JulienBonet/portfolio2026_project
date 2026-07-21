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
  deleteTechnology,
  getTechnologies,
} from "@/api/technologies.api";

import AppSnackbar from "@/components/common/AppSnackbar";
import LoadingBlock from "@/components/common/LoadingBlock";

import TechnologyTable from "./TechnologyTable";

import type {
  Technology,
} from "@/types/technology";

export default function TechnologiesPage() {
  const navigate =
    useNavigate();

  const [
    technologies,
    setTechnologies,
  ] = useState<Technology[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    selectedTechnology,
    setSelectedTechnology,
  ] = useState<Technology | null>(
    null,
  );

  const [
    snackbarOpen,
    setSnackbarOpen,
  ] = useState(false);

  const [
    snackbarMessage,
    setSnackbarMessage,
  ] = useState("");

  const [
    snackbarSeverity,
    setSnackbarSeverity,
  ] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  async function load() {
    try {
      setLoading(true);

      const data =
        await getTechnologies();

      setTechnologies(data);

    } catch (error) {
      console.error(error);

      setSnackbarMessage(
        "Impossible de charger les technologies",
      );

      setSnackbarSeverity(
        "error",
      );

      setSnackbarOpen(true);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleDelete() {
    if (
      !selectedTechnology
    ) {
      return;
    }

    try {
      await deleteTechnology(
        selectedTechnology.id,
      );

      await load();

      setSelectedTechnology(
        null,
      );

      setSnackbarMessage(
        "Technologie supprimée",
      );

      setSnackbarSeverity(
        "success",
      );

      setSnackbarOpen(true);

    } catch (error) {
      console.error(error);

      setSnackbarMessage(
        "Cette technologie est utilisée par un projet",
      );

      setSnackbarSeverity(
        "error",
      );

      setSnackbarOpen(true);
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
          Technologies
        </Typography>

        <Button
          variant="contained"
          onClick={() =>
            navigate(
              "/admin/technologies/new",
            )
          }
        >
          Ajouter
        </Button>
      </Box>

      {technologies.length ===
      0 ? (
        <Box
          sx={{
            py: 8,
            textAlign:
              "center",
          }}
        >
          <Typography
            variant="h6"
          >
            Aucune technologie
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
            }}
          >
            Commencez par créer
            votre première
            technologie.
          </Typography>
        </Box>
      ) : (
        <TechnologyTable
          technologies={
            technologies
          }
          onEdit={(id) =>
            navigate(
              `/admin/technologies/${id}/edit`,
            )
          }
          onDelete={(
            technology,
          ) =>
            setSelectedTechnology(
              technology,
            )
          }
        />
      )}

      <Dialog
        open={
          !!selectedTechnology
        }
        onClose={() =>
          setSelectedTechnology(
            null,
          )
        }
      >
        <DialogTitle>
          Supprimer la
          technologie
        </DialogTitle>

        <DialogContent>
          Voulez-vous
          vraiment supprimer
          "
          {
            selectedTechnology?.name
          }
          " ?
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setSelectedTechnology(
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
          snackbarOpen
        }
        message={
          snackbarMessage
        }
        severity={
          snackbarSeverity
        }
        onClose={() =>
          setSnackbarOpen(
            false,
          )
        }
      />
    </Box>
  );
}