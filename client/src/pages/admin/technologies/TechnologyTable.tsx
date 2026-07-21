import { useState } from "react";

import {
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Stack,
} from "@mui/material";

import type { Technology } from "@/types/technology";

interface Props {
  technologies: Technology[];
  onEdit: (id: number) => void;
  onDelete: (technology: Technology) => void;
}

type Order = "asc" | "desc";

export default function TechnologyTable({ technologies, onEdit, onDelete }: Props) {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [order, setOrder] = useState<Order>("asc");

  const [orderBy, setOrderBy] = useState<keyof Technology>("name");

  function handleSort(property: keyof Technology) {
    const isAsc = orderBy === property && order === "asc";

    setOrder(isAsc ? "desc" : "asc");

    setOrderBy(property);

    setPage(0);
  }

  const sortedTechnologies = [...technologies].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (typeof aValue === "boolean" && typeof bValue === "boolean") {
      return order === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
    }

    return order === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const paginatedTechnologies = sortedTechnologies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleSort("name")}
              >
                Nom
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === "category"}
                direction={orderBy === "category" ? order : "asc"}
                onClick={() => handleSort("category")}
              >
                Catégorie
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === "is_featured"}
                direction={orderBy === "is_featured" ? order : "asc"}
                onClick={() => handleSort("is_featured")}
              >
                Featured
              </TableSortLabel>
            </TableCell>

            <TableCell>Icône</TableCell>

            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedTechnologies.map((technology) => (
            <TableRow key={technology.id}>
              <TableCell>{technology.name}</TableCell>

              <TableCell>{technology.category}</TableCell>

              <TableCell>{technology.is_featured ? "Oui" : "Non"}</TableCell>

              <TableCell>
                {technology.icon_url ? (
                  <Box
                    component="img"
                    src={technology.icon_url}
                    alt={technology.name}
                    sx={{
                      width: 32,
                      height: 32,
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button size="small" variant="outlined" onClick={() => onEdit(technology.id)}>
                    Modifier
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => onDelete(technology)}
                  >
                    Supprimer
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={technologies.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(Number(event.target.value));

          setPage(0);
        }}
      />
    </Paper>
  );
}
