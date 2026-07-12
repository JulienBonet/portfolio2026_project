import { Request, Response } from "express";

import {
  findAllTechnologies,
  findAllTechnologiesFeatured,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  isTechnologyUsed,
  TechnologyCategory,
  findTechnologyById,
} from "../models/technologyModel.js";


export async function getTechnologies(
  _req: Request,
  res: Response,
) {
  try {
    const technologies = await findAllTechnologies();

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
    const technologiesFeatured =
      await findAllTechnologiesFeatured();

    res.json(technologiesFeatured);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch featured technologies",
    });
  }
}

export async function getTechnologyById(
  req: Request,
  res: Response,
) {
  try {
    const id = Number(req.params.id);

    const technology = await findTechnologyById(id);

    if (!technology) {
      return res.status(404).json({
        message: "Technology not found",
      });
    }

    res.json(technology);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch technology",
    });
  }
}


export async function createTechnologyController(
  req: Request,
  res: Response,
) {
  try {
    const {
      name,
      icon_url,
      category,
      is_featured,
    } = req.body;


    if (!name || !category) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }


    const result = await createTechnology(
      name,
      icon_url ?? null,
      category as TechnologyCategory,
      Boolean(is_featured),
    );


    res.status(201).json({
      message: "Technology created",
      result,
    });


  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create technology",
    });
  }
}


export async function updateTechnologyController(
  req: Request,
  res: Response,
) {
  try {

    const id = Number(req.params.id);

    const {
      name,
      icon_url,
      category,
      is_featured,
    } = req.body;


    await updateTechnology(
      id,
      name,
      icon_url ?? null,
      category as TechnologyCategory,
      Boolean(is_featured),
    );


    res.json({
      message: "Technology updated",
    });


  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update technology",
    });
  }
}


export async function deleteTechnologyController(
  req: Request,
  res: Response,
) {
  try {

    const id = Number(req.params.id);


    const used = await isTechnologyUsed(id);


    if (used) {
      return res.status(409).json({
        message:
          "Technology is used by a project and cannot be deleted",
      });
    }


    await deleteTechnology(id);


    res.json({
      message: "Technology deleted",
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to delete technology",
    });
  }
}