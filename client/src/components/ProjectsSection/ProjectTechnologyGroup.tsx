import { Box, Stack, Typography } from "@mui/material";

import type { Technology } from "@/types/technology";

type Props = {
  technologies: Technology[];
};

export default function ProjectTechnologyGroup({
  technologies,
}: Props) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <Stack >

      <Stack
        direction="row"
        useFlexGap
        sx={{
            flexWrap: "wrap",
            mt: '1.5rem',
            gap: { xs: '1em', md: 0 },
        }}
      >
        {technologies.map((technology) => (
          <Stack
            key={technology.id}
            spacing={1}
            sx={{
              alignItems: "center",
              width: 60,
            }}
          >
            <Box
              component="img"
              src={technology.icon_url ?? "/images/technology_placeholder.png"}
              alt={technology.name}
              sx={{
                width: 35,
                height: 35,
              }}
            />

            <Typography
              sx={{
                textAlign: "center",
                fontSize: ".8rem",
              }}
            >
              {technology.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}