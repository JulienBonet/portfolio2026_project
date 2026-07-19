import { apiFetch } from "./apiClient";

export async function login(
  login: string,
  password: string,
) {
  return apiFetch<{ token: string }>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    },
  );
}