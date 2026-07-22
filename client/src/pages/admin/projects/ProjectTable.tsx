import { useState } from "react";

import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Project } from "@/types/project";

interface Props {
  projects: Project[];
  onEdit: (id: number) => void;
  onDelete: (project: Project) => void;
}

type Order = "asc" | "desc";

type SortField = "title" | "project_type" | "status" | "is_deployed" | "display_order";

export default function ProjectTable({ projects, onEdit, onDelete }: Props) {
  const [order, setOrder] = useState<Order>("asc");

  const [orderBy, setOrderBy] = useState<SortField>("title");

  function handleSort(property: SortField) {
    const isAsc = orderBy === property && order === "asc";

    setOrder(isAsc ? "desc" : "asc");

    setOrderBy(property);
  }

  const sortedProjects = [...projects].sort((a, b) => {
    const aValue = a[orderBy];

    const bValue = b[orderBy];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }

    return order === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "title"}
                direction={orderBy === "title" ? order : "asc"}
                onClick={() => handleSort("title")}
              >
                Titre
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === "display_order"}
                direction={orderBy === "display_order" ? order : "asc"}
                onClick={() => handleSort("display_order")}
              >
                Ordre
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === "project_type"}
                direction={orderBy === "project_type" ? order : "asc"}
                onClick={() => handleSort("project_type")}
              >
                Type
              </TableSortLabel>
            </TableCell>

            <TableCell>Cover</TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === "is_deployed"}
                direction={orderBy === "is_deployed" ? order : "asc"}
                onClick={() => handleSort("is_deployed")}
              >
                Déployé
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === "status"}
                direction={orderBy === "status" ? order : "asc"}
                onClick={() => handleSort("status")}
              >
                Statut
              </TableSortLabel>
            </TableCell>

            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.title}</TableCell>

              <TableCell>{project.display_order}</TableCell>

              <TableCell>{project.project_type}</TableCell>

              <TableCell>
                <Box
                  component="img"
                  src={project.cover_image_url ?? "/images/project_placeholder.jpg"}
                  alt={project.title}
                  onError={(event) => {
                    event.currentTarget.src = "/images/project_placeholder.jpg";
                  }}
                  sx={{
                    width: 60,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              </TableCell>

              <TableCell>{project.is_deployed ? "Oui" : "Non"}</TableCell>

              <TableCell>
                <Chip
                  size="small"
                  color={project.status === "published" ? "success" : "default"}
                  label={project.status === "published" ? "Publié" : "Brouillon"}
                />
              </TableCell>

              <TableCell align="right">
                <IconButton onClick={() => onEdit(project.id)}>
                  <EditIcon />
                </IconButton>

                <IconButton color="error" onClick={() => onDelete(project)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
