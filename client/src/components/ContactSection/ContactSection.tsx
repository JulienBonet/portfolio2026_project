import {
  Box,
  Container,
  Typography,
} from "@mui/material";

export default function ContactSection() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "60vh",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3">
          Contact
        </Typography>
      </Container>
    </Box>
  );
}