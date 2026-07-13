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

export async function findProjectImageById(
  imageId: number,
): Promise<ProjectImage | null> {
  const [rows] = await db.query(
    `
      SELECT
        id,
        project_id,
        image_url,
        position
      FROM project_images
      WHERE id = ?
    `,
    [imageId],
  );

  const images = rows as ProjectImage[];

  return images[0] ?? null;
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

export async function getNextImagePosition(
  projectId: number,
): Promise<number> {

  const [rows] = await db.query(
    `
      SELECT
        COALESCE(
          MAX(position) + 1,
          0
        ) AS nextPosition
      FROM project_images
      WHERE project_id = ?
    `,
    [projectId],
  );

  const result = rows as {
    nextPosition: number;
  }[];

  return result[0].nextPosition;
}

export async function reorderPositionsAfterDelete(
  projectId: number,
  deletedPosition: number,
) {
  const [result] = await db.query(
    `
      UPDATE project_images
      SET position = position - 1
      WHERE project_id = ?
      AND position > ?
    `,
    [
      projectId,
      deletedPosition,
    ],
  );

  return result;
}

export async function moveProjectImage(
  imageId: number,
  newPosition: number,
) {
  const image = await findProjectImageById(
    imageId,
  );

  if (!image) {
    return null;
  }

  const oldPosition =
    image.position;

  const projectId =
    image.project_id;

  if (oldPosition === newPosition) {
    return image;
  }

  if (newPosition < oldPosition) {
    await db.query(
      `
        UPDATE project_images
        SET position = position + 1
        WHERE project_id = ?
        AND position >= ?
        AND position < ?
      `,
      [
        projectId,
        newPosition,
        oldPosition,
      ],
    );
  }

  if (newPosition > oldPosition) {
    await db.query(
      `
        UPDATE project_images
        SET position = position - 1
        WHERE project_id = ?
        AND position <= ?
        AND position > ?
      `,
      [
        projectId,
        newPosition,
        oldPosition,
      ],
    );
  }

  await db.query(
    `
      UPDATE project_images
      SET position = ?
      WHERE id = ?
    `,
    [
      newPosition,
      imageId,
    ],
  );

  return true;
}