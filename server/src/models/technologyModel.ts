import { db } from '../config/database.js';

export interface Technology {
  id: number;
  name: string;
  icon_url: string | null;
  category: string;
  is_featured: boolean;
}

export async function getAllTechnologies(): Promise<Technology[]> {
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

export async function getAllTechnologiesFeatured(): Promise<Technology[]> {
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
        ORDER BY category, name;
    `,
  );

  return rows as Technology[];
}
