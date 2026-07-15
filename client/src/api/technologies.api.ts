import { apiFetch } from "./apiClient";

import type {
  Technology,
} from "@/types/technology";

export async function getTechnologies() {
  return apiFetch<Technology[]>(
    "/technologies",
  );
}