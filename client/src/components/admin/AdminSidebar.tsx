import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  removeToken,
} from "@/services/auth";


export default function AdminSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate("/admin/login");
  }

  return (
    <Box
      sx={{
        width: 260,
        minHeight: "100vh",
        borderRight: "1px solid",
        borderColor: "divider",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 600,
        }}
      >
        Portfolio Admin
      </Typography>

      <Divider />

      <List
        sx={{
          mt: 2,
          flexGrow: 1,
        }}
      >
        <ListItemButton
          component={Link}
          to="/admin"
        >
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/admin/technologies"
        >
          <ListItemText primary="Technologies" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/admin/projects"
        >
          <ListItemText primary="Projets" />
        </ListItemButton>
      </List>

      <Divider sx={{ mb: 2 }} />

      <Button
        variant="outlined"
        color="error"
        onClick={handleLogout}
      >
        Déconnexion
      </Button>
    </Box>
  );
}
