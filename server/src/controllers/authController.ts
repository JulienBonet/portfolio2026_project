import { Request, Response } from "express";

import { authenticateUser } from "../services/authService.js";

export async function loginController(
  req: Request,
  res: Response,
) {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({
        message: "Missing credentials",
      });
    }

    const result = await authenticateUser(
      login,
      password,
    );

    if (!result) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Authentication failed",
    });
  }
}