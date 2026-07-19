import { Box, Typography } from "@mui/material";

export default function AdminHeader() {
  return (
    <Box
      sx={{
        height: 60,
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        px: 3,
      }}
    >
      <Typography variant="h6">
        Administration
      </Typography>
    </Box>
  );
}