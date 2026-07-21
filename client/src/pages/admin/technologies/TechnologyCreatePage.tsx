import { Box, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import TechnologyForm from "./TechnologyForm";

export default function TechnologyCreatePage() {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Ajouter une technologie
      </Typography>

      <TechnologyForm onSuccess={() => navigate("/admin/technologies")} />
    </Box>
  );
}
