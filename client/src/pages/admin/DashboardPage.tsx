import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import { getDashboardStats } from "@/api/dashboard.api";


interface DashboardStats {
  projectsCount: number;
  technologiesCount: number;
  publishedProjects: number;
  draftProjects: number;
}


export default function DashboardPage() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        const data =
          await getDashboardStats();

        setStats(data);

      } catch {
        setError(
          "Impossible de charger le dashboard",
        );
      }
    }

    loadStats();
  }, []);


  if (error) {
    return (
      <Typography color="error">
        {error}
      </Typography>
    );
  }


  if (!stats) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }


  const cards = [
    {
      label: "Projets",
      value: stats.projectsCount,
    },
    {
      label: "Technologies",
      value: stats.technologiesCount,
    },
    {
      label: "Publiés",
      value: stats.publishedProjects,
    },
    {
      label: "Brouillons",
      value: stats.draftProjects,
    },
  ];


  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
        }}
      >
        Dashboard
      </Typography>


      <Grid
        container
        spacing={3}
      >
        {cards.map((card) => (
          <Grid
            key={card.label}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card>
              <CardContent>
                <Typography
                  color="text.secondary"
                >
                  {card.label}
                </Typography>

                <Typography
                  variant="h3"
                >
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}