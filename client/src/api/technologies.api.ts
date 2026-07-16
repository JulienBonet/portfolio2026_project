import { apiFetch } from "./apiClient";

import type {
  Technology,
} from "@/types/technology";

export async function getTechnologies() {
  return apiFetch<Technology[]>(
    "/technologies",
  );
}

export async function getTechnologiesFeatured() {
  return apiFetch<Technology[]>(
    "/technologies/featured",
  );
}