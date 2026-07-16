import { Stack, Typography } from "@mui/material";

export default function AboutMeBlock() {
  return (
    <Stack
      sx={{
        backgroundColor: "var(--color-00)",
        border: "1px dashed black",
        borderRadius: "5px",
        width: "95%",
        padding: "1rem",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: {
            xs: "1em",
            md: "1em",
          },
          fontWeight: 500,
        }}
      >
        à propos de moi :
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Après avoir travaillé dans les domaines de la photographie, de la vidéo, de la communication
        digitale pour le monde du spectacle, du cinéma, de l'hôtelerie, de la haute administration
        et du fundraising, j'officie également dans le développement web.
      </Typography>
      <Typography
        sx={{
          mt: 2,
          "& strong": {
            fontWeight: 700,
          },
        }}
      >
        Ayant suivi une formation de <strong>développeur web</strong> de niveau bac + 2 à la Wild
        Code School de Paris, j'ai acquis une maîtrise des langages <strong>HTML</strong>, <strong>CSS</strong> et <strong>JS</strong> en front-end
        (<strong>React JS</strong>) et en back-end (<strong>Express JS</strong>).
      </Typography>
      <Typography  sx={{
          mt: 2,
          "& strong": {
            fontWeight: 700,
          },
        }}>
        <strong>Autonome</strong> et <strong>fiable</strong>, je m'attache à concilier <strong>créativité</strong> et  <strong>rigueur</strong>. Fort de mon parcours,
        j'ai développé une approche éclairée des problématiques UX et UI. Je suis en mesure de
        prendre en charge la <strong>production</strong> d'un site web, de la <strong>conception</strong> des maquettes à son
        <strong>déploiement</strong>.
      </Typography>
    </Stack>
  );
}
