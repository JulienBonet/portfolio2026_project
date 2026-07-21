import { apiFetch } from "./apiClient";

import type { Technology } from "@/types/technology";

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

export async function getTechnologyById(
  id: number,
) {
  return apiFetch<Technology>(
    `/technologies/${id}`,
  );
}

export async function createTechnology(
  technology: {
    name: string;
    category: Technology["category"];
    is_featured: boolean;
  },
) {
  return apiFetch<Technology>(
    "/technologies",
    {
      method: "POST",
      body: JSON.stringify(
        technology,
      ),
    },
  );
}

export async function updateTechnology(
  id: number,
  technology: {
    name: string;
    category: Technology["category"];
    is_featured: boolean;
  },
) {
  return apiFetch<Technology>(
    `/technologies/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(
        technology,
      ),
    },
  );
}

export async function deleteTechnology(
  id: number,
) {
  return apiFetch(
    `/technologies/${id}`,
    {
      method: "DELETE",
    },
  );
}

export async function uploadTechnologyIcon(
  id: number,
  file: File,
) {
  const formData = new FormData();

  formData.append(
    "image",
    file,
  );

  return apiFetch(
    `/technologies/${id}/icon/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
}