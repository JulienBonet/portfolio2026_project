import { CircularProgress, Stack } from "@mui/material";

export default function LoadingBlock() {
  return (
    <Stack
      sx={{
        minHeight: 300,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Stack>
  );
}