import { Stack, Typography } from "@mui/material";

type Props = {
  message: string;
};

export default function ErrorBlock({ message }: Props) {
  return (
    <Stack
      sx={{
        minHeight: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--color-00)",
        border: "1px dashed black",
        borderRadius: "5px",
      }}
    >
      <Typography>
        {message}
      </Typography>
    </Stack>
  );
}