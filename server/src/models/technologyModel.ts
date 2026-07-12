import { db } from "../config/database.js";

export type TechnologyCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "tool";

export interface Technology {
  id: number;
  name: string;
  icon_url: string | null;
  category: TechnologyCategory;
  is_featured: boolean;
}

export async function findAllTechnologies(): Promise<Technology[]> {
  const [rows] = await db.query(
    `
      SELECT
        id,
        name,
        icon_url,
        category,
        is_featured
      FROM technologies
      ORDER BY name ASC
    `,
  );

  return rows as Technology[];
}


export async function findAllTechnologiesFeatured(): Promise<Technology[]> {
  const [rows] = await db.query(
    `
      SELECT
        id,
        name,
        icon_url,
        category,
        is_featured
      FROM technologies
      WHERE is_featured = true
      ORDER BY category, name
    `,
  );

  return rows as Technology[];
}

export async function findTechnologyById(
  id: number,
): Promise<Technology | null> {

  const [rows] = await db.query(
    `
      SELECT
        id,
        name,
        icon_url,
        category,
        is_featured
      FROM technologies
      WHERE id = ?
    `,
    [id],
  );

  const technologies = rows as Technology[];

  return technologies[0] ?? null;
}

export async function findTechnologiesByProjectId(
  projectId: number,
): Promise<Technology[]> {

  const [rows] = await db.query(
    `
      SELECT
        t.id,
        t.name,
        t.icon_url,
        t.category,
        t.is_featured
      FROM technologies t
      INNER JOIN project_technologies pt
        ON pt.technology_id = t.id
      WHERE pt.project_id = ?
      ORDER BY t.name ASC
    `,
    [projectId],
  );

  return rows as Technology[];
}


export async function createTechnology(
  name: string,
  icon_url: string | null,
  category: TechnologyCategory,
  is_featured: boolean,
) {
  const [result] = await db.query(
    `
      INSERT INTO technologies (
        name,
        icon_url,
        category,
        is_featured
      )
      VALUES (?, ?, ?, ?)
    `,
    [
      name,
      icon_url,
      category,
      is_featured,
    ],
  );

  return result;
}


export async function updateTechnology(
  id: number,
  name: string,
  icon_url: string | null,
  category: TechnologyCategory,
  is_featured: boolean,
) {
  const [result] = await db.query(
    `
      UPDATE technologies
      SET
        name = ?,
        icon_url = ?,
        category = ?,
        is_featured = ?
      WHERE id = ?
    `,
    [
      name,
      icon_url,
      category,
      is_featured,
      id,
    ],
  );

  return result;
}


export async function isTechnologyUsed(
  id: number,
): Promise<boolean> {

  const [rows] = await db.query(
    `
      SELECT COUNT(*) AS count
      FROM project_technologies
      WHERE technology_id = ?
    `,
    [id],
  );

  const result = rows as { count: number }[];

  return result[0].count > 0;
}


export async function deleteTechnology(
  id: number,
) {
  const [result] = await db.query(
    `
      DELETE FROM technologies
      WHERE id = ?
    `,
    [id],
  );

  return result;
}
