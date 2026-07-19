import { useState } from "react";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { login } from "@/api/auth.api";
import { saveToken } from "@/services/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [loginValue, setLoginValue] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    try {
      const result = await login(
        loginValue,
        password,
      );

      saveToken(result.token);

      navigate("/admin");

    } catch {
      setError(
        "Identifiants invalides",
      );
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 400,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4">
            Administration
          </Typography>

          <TextField
            label="Login"
            value={loginValue}
            onChange={(e) =>
              setLoginValue(
                e.target.value,
              )
            }
          />

          <TextField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value,
              )
            }
          />

          {error && (
            <Typography color="error">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
          >
            Connexion
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}