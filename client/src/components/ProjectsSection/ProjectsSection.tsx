import {
  Box,
  Container,
  Typography,
} from "@mui/material";

export default function ProjectsSection() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3">
          Projets
        </Typography>
      </Container>
    </Box>
  );
}