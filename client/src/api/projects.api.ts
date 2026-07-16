import { apiFetch } from "./apiClient";

import type {
  Project,
  ProjectDetail,
} from "@/types/project";

export async function getProjects() {
  return apiFetch<Project[]>(
    "/projects",
  );
}

export async function getProjectById(id: number) {
  return apiFetch<ProjectDetail>(
    `/projects/${id}`,
  );
}