import {
  Box,
  Typography,
} from "@mui/material";

import {
  useNavigate,
} from "react-router-dom";

import ProjectForm from "./ProjectForm";

export default function ProjectCreatePage() {
  const navigate =
    useNavigate();

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Ajouter un projet
      </Typography>

      <ProjectForm
        onSuccess={() =>
          navigate(
            "/admin/projects",
          )
        }
      />
    </Box>
  );
}