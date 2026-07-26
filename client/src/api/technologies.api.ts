import { apiFetch } from "./apiClient";

import type { Technology } from "@/types/technology";

interface CreateTechnologyResponse {
  message: string;
  result: {
    insertId: number;
    affectedRows: number;
  };
}

export async function getTechnologies() {
  return apiFetch<Technology[]>(
    "/technologies",
  );
}

export async function getTechnologiesFeatured(
  categories: string[],
) {
  return apiFetch<Technology[]>(
    `/technologies/featured?categories=${categories.join(",")}`,
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
    display_order: number;
  },
) {
  return apiFetch<CreateTechnologyResponse>(
    "/technologies",
    {
      method: "POST",
      body: JSON.stringify(technology),
    },
  );
}

export async function updateTechnology(
  id: number,
  technology: {
    name: string;
    category: Technology["category"];
    is_featured: boolean;
    display_order: number;
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