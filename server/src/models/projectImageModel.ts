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

export async function createProjectImage(
  projectId: number,
  image_url: string,
  position: number,
) {
  const [result] = await db.query(
    `
      INSERT INTO project_images (
        project_id,
        image_url,
        position
      )
      VALUES (?, ?, ?)
    `,
    [
      projectId,
      image_url,
      position,
    ],
  );

  return result;
}

export async function updateProjectImagePosition(
  imageId: number,
  position: number,
) {
  const [result] = await db.query(
    `
      UPDATE project_images
      SET position = ?
      WHERE id = ?
    `,
    [
      position,
      imageId,
    ],
  );

  return result;
}

export async function deleteProjectImage(
  imageId: number,
) {
  const [result] = await db.query(
    `
      DELETE FROM project_images
      WHERE id = ?
    `,
    [imageId],
  );

  return result;
}

