import { Request, Response } from "express";
import { getAllTechnologies, getAllTechnologiesFeatured } from "../models/technologyModel.js";

export async function getTechnologies(
  _req: Request,
  res: Response,
) {
  try {
    const technologies = await getAllTechnologies();

    res.json(technologies);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch technologies",
    });
  }
}

export async function getTechnologiesFeatured(
  _req: Request,
  res: Response,
) {
  try {
    const technologiesFeatured = await getAllTechnologiesFeatured();

    res.json(technologiesFeatured);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch technologies",
    });
  }
}