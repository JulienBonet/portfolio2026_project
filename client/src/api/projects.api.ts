import { apiFetch } from "./apiClient";

import type {
  Project,
} from "@/types/project";

export async function getProjects() {
  return apiFetch<Project[]>(
    "/projects",
  );
}