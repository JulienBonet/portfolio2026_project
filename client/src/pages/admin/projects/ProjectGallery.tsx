import { useEffect, useState } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";

import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

import {
  deleteProjectImage,
  getProjectImages,
  updateProjectImagePosition,
  uploadProjectImage,
} from "@/api/projects.api";

import type { ProjectImage } from "@/types/project";

import SortableProjectImage from "./SortableProjectImage";

interface Props {
  projectId: number;
}

export default function ProjectGallery({ projectId }: Props) {
  const [images, setImages] = useState<ProjectImage[]>([]);

  const [loading, setLoading] = useState(false);

  async function loadImages() {
    const data = await getProjectImages(projectId);

    setImages(data);
  }

  useEffect(() => {
    async function fetchImages() {
      const data = await getProjectImages(projectId);

      setImages(data);
    }

    fetchImages();
  }, [projectId]);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setLoading(true);

    try {
      await uploadProjectImage(projectId, file);

      await loadImages();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(imageId: number) {
    setLoading(true);

    try {
      await deleteProjectImage(projectId, imageId);

      await loadImages();
    } finally {
      setLoading(false);
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = images.findIndex((image) => image.id === active.id);

    const newIndex = images.findIndex((image) => image.id === over.id);

    const reordered = arrayMove(images, oldIndex, newIndex);

    setImages(reordered);

    await updateProjectImagePosition(projectId, Number(active.id), newIndex);

    await loadImages();
  }

  return (
    <Stack
      spacing={2}
      sx={{
        p: 2,
        border: "solid 1px SaddleBrown",
        borderRadius: "10px",
      }}
    >
      <Typography
        sx={{
          mb: 2,
        }}
      >
        {" "}
        GALERIE D'IMAGES
      </Typography>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={images.map((image) => image.id)}
          strategy={horizontalListSortingStrategy}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 1,
            }}
          >
            {images.map((image) => (
              <SortableProjectImage
                key={image.id}
                image={image}
                onDelete={handleDelete}
                disabled={loading}
              />
            ))}
          </Box>
        </SortableContext>
      </DndContext>

      <Button
        variant="outlined"
        component="label"
        disabled={loading}
        sx={{
          color: "SaddleBrown",
          borderColor: "SaddleBrown",

          "&:hover": {
            borderColor: "SaddleBrown",
            backgroundColor: "rgba(139, 69, 19, 0.08)",
          },
        }}
      >
        {loading ? "Traitement..." : "Ajouter une image"}

        <input hidden type="file" accept="image/*" onChange={handleUpload} />
      </Button>
    </Stack>
  );
}
