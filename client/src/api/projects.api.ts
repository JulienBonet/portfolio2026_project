import { apiFetch } from "./apiClient";

import type {
  Project,
  ProjectDetail,
  ProjectImage,
} from "@/types/project";

interface CreateProjectResponse {
  message: string;
  result: {
    insertId: number;
    affectedRows: number;
  };
}

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

export async function getAdminProjects() {
  return apiFetch<Project[]>(
    "/projects/admin",
  );
}

export async function getAdminProjectById(
  id: number,
) {
  return apiFetch<ProjectDetail>(
    `/projects/admin/${id}`,
  );
}

export async function createProject(
  project: Partial<ProjectDetail>,
) {
  return apiFetch<CreateProjectResponse>(
    "/projects",
    {
      method: "POST",
      body: JSON.stringify(project),
    },
  );
}

export async function updateProject(
  id: number,
  project: Partial<ProjectDetail>,
) {
  return apiFetch(
    `/projects/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(project),
    },
  );
}

export async function deleteProject(
  id: number,
) {
  return apiFetch(
    `/projects/${id}`,
    {
      method: "DELETE",
    },
  );
}

export async function uploadProjectCover(
  id: number,
  file: File,
) {
  const formData = new FormData();

  formData.append(
    "image",
    file,
  );

  return apiFetch(
    `/projects/${id}/cover/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
}

export async function getProjectImages(
  id: number,
) {
  return apiFetch<ProjectImage[]>(
    `/projects/${id}/images`,
  );
}


export async function uploadProjectImage(
  id: number,
  file: File,
) {
  const formData = new FormData();

  formData.append(
    "image",
    file,
  );

  return apiFetch(
    `/projects/${id}/images/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
}


export async function deleteProjectImage(
  projectId: number,
  imageId: number,
) {
  return apiFetch(
    `/projects/${projectId}/images/${imageId}`,
    {
      method: "DELETE",
    },
  );
}


export async function updateProjectImagePosition(
  projectId: number,
  imageId: number,
  position: number,
) {
  return apiFetch(
    `/projects/${projectId}/images/${imageId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        position,
      }),
    },
  );
}

export async function updateProjectTechnologies(
  projectId: number,
  technologyIds: number[],
) {
  return apiFetch(
    `/projects/${projectId}/technologies`,
    {
      method: "PUT",
      body: JSON.stringify({
        technologyIds,
      }),
    },
  );
}