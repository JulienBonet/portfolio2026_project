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
            gap: "1em",
            justifyContent: {xs: 'space-between', sm: "flex-start"}
        }}
      >
        {technologies.map((technology) => (
          <Stack
            key={technology.id}
            spacing={1}
            sx={{
              alignItems: "center",
              width: {xs:50, sm:70,}
            }}
          >
            <Box
              component="img"
              src={technology.icon_url ?? "/images/technology_placeholder.png"}
              alt={technology.name}
              sx={{
                width: {xs: 30 , sm: 35},
                height: {xs: 30 , sm: 35},
              }}
            />

            <Typography
              sx={{
                textAlign: "center",
                fontSize: {xs: ".6rem" , sm: ".8rem"}
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