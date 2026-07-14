import { Request, Response } from 'express';

import {
  findImagesByProjectId,
  createProjectImage,
  deleteProjectImage,
  findProjectImageById,
  getNextImagePosition,
  reorderPositionsAfterDelete,
  moveProjectImage,
} from '../models/projectImageModel.js';

import { deleteImageFromCloudinary, uploadImageBuffer } from '../services/cloudinaryService.js';
import { findProjectById } from '../models/projectModel.js';



export async function getProjectImages(req: Request, res: Response) {
  try {
    const projectId = Number(req.params.id);

    if (Number.isNaN(projectId)) {
      return res.status(400).json({
        message: 'Invalid project id',
      });
    }

    const images = await findImagesByProjectId(projectId);

    res.json(images);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to fetch images',
    });
  }
}

export async function createProjectImageController(
  req: Request,
  res: Response,
) {
  try {
    const projectId = Number(req.params.id);

    const { image_url } = req.body;

    if (
      Number.isNaN(projectId) ||
      !image_url
    ) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const position =
      await getNextImagePosition(
        projectId,
      );

    const result =
      await createProjectImage(
        projectId,
        image_url,
        position,
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

export async function uploadProjectImageController(
  req: Request,
  res: Response,
) {
  try {
    const projectId = Number(
      req.params.id,
    );

    if (
      Number.isNaN(projectId) ||
      !req.file
    ) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const project =
      await findProjectById(
        projectId,
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const imageUrl =
      await uploadImageBuffer(
        req.file.buffer,
        `portfolio/projects/${project.slug}`,
      );

    const position =
      await getNextImagePosition(
        projectId,
      );

    const result =
      await createProjectImage(
        projectId,
        imageUrl,
        position,
      );

    res.status(201).json({
      message: "Image uploaded",
      image_url: imageUrl,
      result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to upload image",
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
      typeof position !== "number" ||
      position < 0
    ) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const image =
      await findProjectImageById(
        imageId,
      );

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    const images =
      await findImagesByProjectId(
        image.project_id,
      );

    const maxPosition =
      images.length - 1;

    const targetPosition =
      Math.min(
        position,
        maxPosition,
      );

    await moveProjectImage(
      imageId,
      targetPosition,
    );

    res.json({
      message: "Image updated",
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

    const image =
      await findProjectImageById(
        imageId,
      );

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    await deleteImageFromCloudinary(
      image.image_url,
    );

    const result =
      await deleteProjectImage(
        imageId,
      );

    await reorderPositionsAfterDelete(
      image.project_id,
      image.position,
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
