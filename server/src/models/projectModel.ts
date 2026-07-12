import { db } from "../config/database.js";

export interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  project_type: string;
  duration: string | null;
  github_url: string | null;
  youtube_url: string | null;
  website_url: string | null;
  demo_url: string | null;
  cover_image_url: string | null;
  is_deployed: boolean;
  status: string;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export async function findAllPublishedProjects(): Promise<Project[]> {
  const [rows] = await db.query(
    `
      SELECT
        id,
        title,
        slug,
        short_description,
        full_description,
        project_type,
        duration,
        github_url,
        youtube_url,
        website_url,
        demo_url,
        cover_image_url,
        is_deployed,
        status,
        display_order,
        created_at,
        updated_at
      FROM projects
      WHERE status = 'published'
      ORDER BY display_order ASC
    `,
  );

  return rows as Project[];
}

export async function findProjectById(
  id: number,
): Promise<Project | null> {

  const [rows] = await db.query(
    `
      SELECT
        id,
        title,
        slug,
        short_description,
        full_description,
        project_type,
        duration,
        github_url,
        youtube_url,
        website_url,
        demo_url,
        cover_image_url,
        is_deployed,
        status,
        display_order,
        created_at,
        updated_at
      FROM projects
      WHERE id = ?
        AND status = 'published'
    `,
    [id],
  );

  const projects = rows as Project[];

  return projects[0] ?? null;
}