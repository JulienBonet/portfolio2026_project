import { Request, Response } from "express";

import {
  findImagesByProjectId,
  createProjectImage,
  updateProjectImagePosition,
  deleteProjectImage,
} from "../models/projectImageModel.js";

export async function getProjectImages(
  req: Request,
  res: Response,
) {
  try {
    const projectId = Number(req.params.id);

    if (Number.isNaN(projectId)) {
      return res.status(400).json({
        message: "Invalid project id",
      });
    }

    const images = await findImagesByProjectId(
      projectId,
    );

    res.json(images);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch images",
    });
  }
}

export async function createProjectImageController(
  req: Request,
  res: Response,
) {
  try {
    const projectId = Number(req.params.id);

    const {
      image_url,
      position,
    } = req.body;

    if (
      Number.isNaN(projectId) ||
      !image_url
    ) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const result = await createProjectImage(
      projectId,
      image_url,
      position ?? 0,
    );

    res.status(201).json({
      message: "Image created",
      result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create image",
    });
  }
}

export async function updateProjectImageController(
  req: Request,
  res: Response,
) {
  try {
    const imageId = Number(
      req.params.imageId,
    );

    const { position } = req.body;

    if (
      Number.isNaN(imageId) ||
      typeof position !== "number"
    ) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const result =
      await updateProjectImagePosition(
        imageId,
        position,
      );

    res.json({
      message: "Image updated",
      result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update image",
    });
  }
}

export async function deleteProjectImageController(
  req: Request,
  res: Response,
) {
  try {
    const imageId = Number(
      req.params.imageId,
    );

    if (Number.isNaN(imageId)) {
      return res.status(400).json({
        message: "Invalid image id",
      });
    }

    const result = await deleteProjectImage(
      imageId,
    );

    res.json({
      message: "Image deleted",
      result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete image",
    });
  }
}