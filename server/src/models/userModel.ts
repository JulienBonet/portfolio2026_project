import { db } from "../config/database.js";

export interface User {
  id: number;
  login: string;
  password: string;
}

export async function findUserByLogin(
  login: string,
): Promise<User | null> {
  const [rows] = await db.query(
    `
      SELECT
        id,
        login,
        password
      FROM users
      WHERE login = ?
      LIMIT 1
    `,
    [login],
  );

  const users = rows as User[];

  return users.length > 0 ? users[0] : null;
}