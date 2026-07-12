import { db } from "../config/database.js";

export async function replaceProjectTechnologies(
  projectId: number,
  technologyIds: number[],
) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(
      `
        DELETE FROM project_technologies
        WHERE project_id = ?
      `,
      [projectId],
    );

    if (technologyIds.length > 0) {
      const values = technologyIds.map(() => "(?, ?)").join(",");

      const params = technologyIds.flatMap((technologyId) => [
        projectId,
        technologyId,
      ]);

      await connection.query(
        `
          INSERT INTO project_technologies (
            project_id,
            technology_id
          )
          VALUES ${values}
        `,
        params,
      );
    }

    await connection.commit();

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}