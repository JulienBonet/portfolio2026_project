import { useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getTechnologyById,
} from "@/api/technologies.api";

import type {
  Technology,
} from "@/types/technology";

import TechnologyForm from "./TechnologyForm";

export default function TechnologyEditPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [technology, setTechnology] =
    useState<Technology | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadTechnology() {
      try {
        const data =
          await getTechnologyById(
            Number(id),
          );

        setTechnology(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTechnology();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!technology) {
    return (
      <Typography>
        Technologie introuvable
      </Typography>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
        }}
      >
        Modifier une technologie
      </Typography>

      <TechnologyForm
        technology={technology}
        onSuccess={() =>
          navigate(
            "/admin/technologies",
          )
        }
      />
    </Box>
  );
}