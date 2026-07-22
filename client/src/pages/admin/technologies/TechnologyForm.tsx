import { useState } from "react";

import { Box, Button, Checkbox, FormControlLabel, MenuItem, Stack, TextField } from "@mui/material";

import { createTechnology, updateTechnology, uploadTechnologyIcon } from "@/api/technologies.api";

import AppSnackbar from "@/components/common/AppSnackbar";

import type { Technology } from "@/types/technology";

interface Props {
  technology?: Technology;
  onSuccess?: () => void;
}

export default function TechnologyForm({ technology, onSuccess }: Props) {
  const [name, setName] = useState(technology?.name ?? "");

  const [category, setCategory] = useState<Technology["category"]>(
    technology?.category ?? "frontend",
  );

  const [isFeatured, setIsFeatured] = useState(technology?.is_featured ?? false);

  const [iconFile, setIconFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);

      if (technology) {
        await updateTechnology(technology.id, {
          name,
          category,
          is_featured: isFeatured,
        });

        if (iconFile) {
          await uploadTechnologyIcon(technology.id, iconFile);
        }

        setSnackbarMessage("Technologie mise à jour");
      } else {
        const result = await createTechnology({
          name,
          category,
          is_featured: isFeatured,
        });

        if (iconFile) {
          await uploadTechnologyIcon(result.result.insertId, iconFile);
        }

        setSnackbarMessage("Technologie créée");
      }

      setSnackbarSeverity("success");

      setSnackbarOpen(true);

      setTimeout(() => {
        onSuccess?.();
      }, 500);
    } catch (error) {
      console.error(error);

      setSnackbarMessage("Une erreur est survenue");

      setSnackbarSeverity("error");

      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
        }}
      >
        <TextField
          fullWidth
          label="Nom"
          value={name}
          disabled={loading}
          onChange={(e) => setName(e.target.value)}
          sx={{
            mb: 2,
          }}
        />

        <TextField
          select
          fullWidth
          label="Catégorie"
          value={category}
          disabled={loading}
          onChange={(e) => setCategory(e.target.value as Technology["category"])}
          sx={{
            mb: 2,
          }}
        >
          <MenuItem value="frontend">Frontend</MenuItem>

          <MenuItem value="backend">Backend</MenuItem>

          <MenuItem value="database">Database</MenuItem>

          <MenuItem value="cms">CMS</MenuItem>

          <MenuItem value="devops">DevOps</MenuItem>

          <MenuItem value="design">Design</MenuItem>

          <MenuItem value="management">Management</MenuItem>
        </TextField>

        <Stack
          sx={{
            alignItems: "center",
            border: "solid 1px silver",
            borderRadius: "10px",
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={
              iconFile
                ? URL.createObjectURL(iconFile)
                : technology?.icon_url || "/images/technology_placeholder.png"
            }
            alt="Technology icon"
            sx={{
              width: 64,
              height: 64,
              objectFit: "contain",
              border: "1px solid #ddd",
              borderRadius: "8px",
              p: 1,
              mt: 2,
            }}
          />

          <Button
            component="label"
            variant="outlined"
            disabled={loading}
            sx={{
              my: 2,
            }}
          >
            Choisir une icône
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(event) => setIconFile(event.target.files?.[0] ?? null)}
            />
          </Button>
        </Stack>

        <FormControlLabel
          control={
            <Checkbox
              checked={isFeatured}
              disabled={loading}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
          }
          label="Afficher dans le portfolio"
          sx={{
            mb: 2,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "DarkGreen",
          }}
        >
          {loading ? "Enregistrement..." : technology ? "Mettre à jour" : "Enregistrer"}
        </Button>
      </Stack>

      <AppSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
}
