import { Box, Stack, Typography } from "@mui/material";

import type { Technology } from "@/types/technology";

type TechnologyGroupProps = {
  technologies: Technology[];
};

export default function TechnologyGroup({ technologies }: TechnologyGroupProps) {
  return (
    <Stack spacing={1}>
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {technologies.map((technology) => (
          <Stack
            key={technology.id}
            sx={{
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={technology.icon_url ?? ""}
              alt={technology.name}
              sx={{
                width: 40,
                height: 40,
              }}
            />
            <Typography
              sx={{
                mt: 1,
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
