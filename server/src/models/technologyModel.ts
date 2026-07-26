import { db } from '../config/database.js';

export type TechnologyCategory =
  'frontend' | 'backend' | 'database' | 'design' | 'cms' | 'management' | 'devops';

export interface Technology {
  id: number;
  name: string;
  icon_url: string | null;
  category: TechnologyCategory;
  is_featured: boolean;
  display_order: number;
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

export async function findFeaturedTechnologiesByCategories(
  categories: string[],
): Promise<Technology[]> {

  const placeholders =
    categories.map(() => "?").join(",");

  const [rows] = await db.query(
    `
      SELECT
        id,
        name,
        icon_url,
        category,
        is_featured,
        display_order
      FROM technologies
      WHERE is_featured = true
        AND category IN (${placeholders})
      ORDER BY
        CASE category
          WHEN 'cms' THEN 1
          WHEN 'frontend' THEN 2
          WHEN 'design' THEN 3
          WHEN 'backend' THEN 4
          WHEN 'database' THEN 5
          WHEN 'devops' THEN 6
          WHEN 'management' THEN 7
          ELSE 99
        END,
        display_order ASC,
        name ASC
    `,
    categories,
  );

  return rows as Technology[];
}

export async function findTechnologyById(id: number): Promise<Technology | null> {
  const [rows] = await db.query(
    `
      SELECT
        id,
        name,
        icon_url,
        category,
        is_featured,
        display_order
      FROM technologies
      WHERE id = ?
    `,
    [id],
  );

  const technologies = rows as Technology[];

  return technologies[0] ?? null;
}

export async function findTechnologiesByProjectId(projectId: number): Promise<Technology[]> {
  const [rows] = await db.query(
    `
      SELECT
        t.id,
        t.name,
        t.icon_url,
        t.category,
        t.is_featured,
        t.display_order
      FROM technologies t
      INNER JOIN project_technologies pt
        ON pt.technology_id = t.id
      WHERE pt.project_id = ?
      ORDER BY
    CASE category
      WHEN 'cms' THEN 1
      WHEN 'frontend' THEN 2
      WHEN 'backend' THEN 3
      WHEN 'database' THEN 4
      WHEN 'devops' THEN 5
      WHEN 'design' THEN 6
      WHEN 'management' THEN 7
      ELSE 99
    END,
    display_order ASC,
    name ASC
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
  display_order: number
) {
  const [result] = await db.query(
    `
      INSERT INTO technologies (
        name,
        icon_url,
        category,
        is_featured,
        display_order
      )
      VALUES (?, ?, ?, ?, ?)
    `,
    [name, icon_url, category, is_featured, display_order],
  );

  return result;
}

export async function updateTechnology(
  id: number,
  name: string,
  icon_url: string | null,
  category: TechnologyCategory,
  is_featured: boolean,
  display_order: number
) {
  const [result] = await db.query(
    `
      UPDATE technologies
      SET
        name = ?,
        icon_url = ?,
        category = ?,
        is_featured = ?,
        display_order = ?
      WHERE id = ?
    `,
    [name, icon_url, category, is_featured, display_order, id],
  );

  return result;
}

export async function isTechnologyUsed(id: number): Promise<boolean> {
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

export async function deleteTechnology(id: number) {
  const [result] = await db.query(
    `
      DELETE FROM technologies
      WHERE id = ?
    `,
    [id],
  );

  return result;
}
