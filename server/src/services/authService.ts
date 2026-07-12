import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { findUserByLogin } from "../models/userModel.js";

export async function authenticateUser(
  login: string,
  password: string,
) {
  const user = await findUserByLogin(login);
  console.log(user);

  if (!user) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(
    password,
    user.password,
  );

  if (!isValidPassword) {
    return null;
  }

  const token = jwt.sign(
    {
      userId: user.id,
      login: user.login,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
  };
}