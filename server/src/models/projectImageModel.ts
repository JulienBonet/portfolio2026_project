import { db } from "../config/database.js";

export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  position: number;
}

export async function findImagesByProjectId(
  projectId: number,
): Promise<ProjectImage[]> {

  const [rows] = await db.query(
    `
      SELECT
        id,
        project_id,
        image_url,
        position
      FROM project_images
      WHERE project_id = ?
      ORDER BY position ASC
    `,
    [projectId],
  );

  return rows as ProjectImage[];
}