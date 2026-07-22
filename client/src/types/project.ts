import type { Technology } from "./technology";

export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  position: number;
}

export type ProjectStatus =
  | "draft"
  | "published";

export type Project = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
    project_type:
    | "school"
    | "hackathon"
    | "personal"
    | "professional";
  duration: string | null;
  cover_image_url: string | null;
  website_url: string | null;
  github_url: string | null;
  status: ProjectStatus;
  is_deployed: boolean;
  display_order: number;
};

export type ProjectDetail = Project & {
  full_description: string;
  youtube_url: string | null;
  technologies: Technology[];
  images: {
    id: number;
    image_url: string;
    position: number;
  }[];
};

export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  position: number;
}

