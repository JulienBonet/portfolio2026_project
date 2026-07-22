import {
  Card,
  CardMedia,
  Chip,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  useSortable,
} from "@dnd-kit/sortable";

import {
  CSS,
} from "@dnd-kit/utilities";

import type {
  ProjectImage,
} from "@/types/project";


interface Props {
  image: ProjectImage;
  onDelete: (
    imageId: number,
  ) => void;

  disabled?: boolean;
}

export default function SortableProjectImage({
  image,
  onDelete,
  disabled
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: image.id,
  });

  const style = {
    transform:
      CSS.Transform.toString(
        transform,
      ),
    transition,
    cursor: "grab",
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        minWidth: 180,
        width: 180,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <Chip
        label={`#${image.position}`}
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 2,
          backgroundColor: 'white',
        }}
      />

      <IconButton
        size="small"
        disabled={disabled}
        onClick={() =>
          onDelete(image.id)
        }
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 2,
          bgcolor:
            "background.paper",
        }}
      >
        <DeleteIcon />
      </IconButton>

      <CardMedia
        component="img"
        image={image.image_url}
        sx={{
          height: 120,
          objectFit: "cover",
        }}
      />
    </Card>
  );
}