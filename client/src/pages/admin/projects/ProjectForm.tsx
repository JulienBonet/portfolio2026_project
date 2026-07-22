import { useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import {
  createProject,
  updateProject,
  uploadProjectCover,
  updateProjectTechnologies,
} from "@/api/projects.api";

import { getTechnologies } from "@/api/technologies.api";

import type { Technology } from "@/types/technology";

import type { ProjectDetail, ProjectStatus } from "@/types/project";

import RichTextEditor from "@/components/common/RichTextEditor";
import ProjectGallery from "./ProjectGallery";

interface Props {
  project?: ProjectDetail;
  onSuccess?: () => void;
}

export default function ProjectForm({ project, onSuccess }: Props) {
  const [title, setTitle] = useState(project?.title ?? "");

  const [slug, setSlug] = useState(project?.slug ?? "");

  const [shortDescription, setShortDescription] = useState(project?.short_description ?? "");

  const [fullDescription, setFullDescription] = useState(project?.full_description ?? "");

  const [projectType, setProjectType] = useState(project?.project_type ?? "personal");

  const [duration, setDuration] = useState(project?.duration ?? "");

  const [githubUrl, setGithubUrl] = useState(project?.github_url ?? "");

  const [websiteUrl, setWebsiteUrl] = useState(project?.website_url ?? "");

  const [youtubeUrl, setYoutubeUrl] = useState(project?.youtube_url ?? "");

  const [status, setStatus] = useState<ProjectStatus>(project?.status ?? "draft");

  const [isDeployed, setIsDeployed] = useState(Boolean(project?.is_deployed));

  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [coverPreview, setCoverPreview] = useState(project?.cover_image_url ?? "");

  const [allTechnologies, setAllTechnologies] = useState<Technology[]>([]);

  const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>(
    project?.technologies ?? [],
  );

  const [displayOrder, setDisplayOrder] = useState(project?.display_order ?? 0);

  useEffect(() => {
    async function loadTechnologies() {
      const data = await getTechnologies();

      const sorted = [...data].sort((a, b) => {
        const categoryCompare = a.category.localeCompare(b.category);

        if (categoryCompare !== 0) {
          return categoryCompare;
        }

        return a.name.localeCompare(b.name);
      });

      setAllTechnologies(sorted);
    }

    loadTechnologies();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const payload = {
      title,
      slug,
      short_description: shortDescription,
      full_description: fullDescription,
      project_type: projectType,
      duration: duration || null,
      github_url: githubUrl || null,
      website_url: websiteUrl || null,
      youtube_url: youtubeUrl || null,
      status,
      is_deployed: isDeployed,
      display_order: displayOrder,
    };

    let projectId = project?.id;

    if (project) {
      await updateProject(project.id, payload);
    } else {
      const result = await createProject(payload);

      projectId = result.result.insertId;
    }

    if (coverFile && projectId) {
      await uploadProjectCover(projectId, coverFile);
    }

    if (projectId) {
      await updateProjectTechnologies(
        projectId,
        selectedTechnologies.map((technology) => technology.id),
      );
    }

    onSuccess?.();
  }

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 800,
      }}
    >
      <TextField label="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <TextField label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />

      <TextField
        label="Description courte"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        required
      />

      <RichTextEditor value={fullDescription} onChange={setFullDescription} />

      <TextField
        select
        label="Type"
        value={projectType}
        onChange={(e) =>
          setProjectType(e.target.value as "school" | "hackathon" | "personal" | "professional")
        }
      >
        <MenuItem value="school">School</MenuItem>

        <MenuItem value="hackathon">Hackathon</MenuItem>

        <MenuItem value="personal">Personal</MenuItem>

        <MenuItem value="professional">Professional</MenuItem>
      </TextField>

      <TextField label="Durée" value={duration} onChange={(e) => setDuration(e.target.value)} />

      <TextField label="Github" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />

      <TextField
        label="Website"
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
      />

      <TextField
        label="Youtube"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
      />

      <Box>
        <Autocomplete
          multiple
          options={allTechnologies}
          value={selectedTechnologies}
          onChange={(_, value) => setSelectedTechnologies(value)}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label="Technologies" />}
        />
      </Box>

      <Box
        sx={{
          border: "solid 1px RebeccaPurple",
          borderRadius: "10px",
          p: 2,
        }}
      >
        {coverPreview && (
          <Box
            component="img"
            src={coverPreview}
            alt="Cover preview"
            sx={{
              width: 300,
              border: 1,
              borderRadius: 2,
              display: "block",
              mb: 2,
            }}
          />
        )}

        <Button
          variant="outlined"
          component="label"
          sx={{
            color: "RebeccaPurple",
            borderColor: "RebeccaPurple",

            "&:hover": {
              borderColor: "RebeccaPurple",
              backgroundColor: "rgba(102, 51, 153, 0.08)",
            },
          }}
        >
          Choisir une cover
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) {
                return;
              }

              setCoverFile(file);

              setCoverPreview(URL.createObjectURL(file));
            }}
          />
        </Button>
      </Box>

      {project && <ProjectGallery projectId={project.id} />}

      <Stack
        spacing={2}
        sx={{
          p: 2,
          border: "solid 1px lightgrey",
          borderRadius: "10px",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox checked={isDeployed} onChange={(e) => setIsDeployed(e.target.checked)} />
          }
          label="Projet déployé"
        />

        <TextField
          label="Ordre d'affichage"
          type="number"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(Math.max(0, Number(e.target.value)))}
          slotProps={{
            htmlInput: {
              min: 0,
            },
          }}
        />

        <TextField
          select
          label="Statut"
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus)}
        >
          <MenuItem value="draft">Brouillon</MenuItem>

          <MenuItem value="published">Publié</MenuItem>
        </TextField>
      </Stack>

      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "DarkGreen",
        }}
      >
        {project ? "Mettre à jour" : "Créer"}
      </Button>
    </Stack>
  );
}
