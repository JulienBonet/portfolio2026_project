import type { Technology } from "./technology";

export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  position: number;
}

export interface Project {
  id: number;

  title: string;
  slug: string;

  short_description: string;
  full_description: string | null;

  project_type:
    | "school"
    | "hackathon"
    | "personal"
    | "professional";

  duration: string | null;

  github_url: string | null;
  website_url: string | null;
  demo_url: string | null;
  youtube_url: string | null;

  cover_image_url: string | null;

  is_deployed: boolean;

  status:
    | "draft"
    | "published";

  display_order: number;

  created_at: string;
  updated_at: string;

  technologies: Technology[];

  images: ProjectImage[];
}