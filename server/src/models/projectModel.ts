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

export async function createProject(data: {
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  project_type: string;
  duration?: string | null;
  github_url?: string | null;
  youtube_url?: string | null;
  website_url?: string | null;
  demo_url?: string | null;
  cover_image_url?: string | null;
  is_deployed: boolean;
  status: string;
  display_order: number;
}) {

  const [result] = await db.query(
    `
      INSERT INTO projects (
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
        display_order
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.title,
      data.slug,
      data.short_description,
      data.full_description,
      data.project_type,
      data.duration ?? null,
      data.github_url ?? null,
      data.youtube_url ?? null,
      data.website_url ?? null,
      data.demo_url ?? null,
      data.cover_image_url ?? null,
      data.is_deployed,
      data.status,
      data.display_order,
    ],
  );

  return result;
}

export async function updateProject(
  id: number,
  data: {
    title: string;
    slug: string;
    short_description: string;
    full_description: string;
    project_type: string;
    duration?: string | null;
    github_url?: string | null;
    youtube_url?: string | null;
    website_url?: string | null;
    demo_url?: string | null;
    cover_image_url?: string | null;
    is_deployed: boolean;
    status: string;
    display_order: number;
  },
) {
  const [result] = await db.query(
    `
      UPDATE projects
      SET
        title = ?,
        slug = ?,
        short_description = ?,
        full_description = ?,
        project_type = ?,
        duration = ?,
        github_url = ?,
        youtube_url = ?,
        website_url = ?,
        demo_url = ?,
        cover_image_url = ?,
        is_deployed = ?,
        status = ?,
        display_order = ?
      WHERE id = ?
    `,
    [
      data.title,
      data.slug,
      data.short_description,
      data.full_description,
      data.project_type,
      data.duration ?? null,
      data.github_url ?? null,
      data.youtube_url ?? null,
      data.website_url ?? null,
      data.demo_url ?? null,
      data.cover_image_url ?? null,
      data.is_deployed,
      data.status,
      data.display_order,
      id,
    ],
  );

  return result;
}

export async function deleteProject(id: number) {
  const [result] = await db.query(
    `
      DELETE FROM projects
      WHERE id = ?
    `,
    [id],
  );

  return result;
}