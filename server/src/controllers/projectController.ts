import { Request, Response } from 'express';

import {
  createProject,
  deleteProject,
  findAllProjects,
  findAllPublishedProjects,
  findProjectById,
  updateProject,
  updateProjectCoverImage,
} from '../models/projectModel.js';

import { uploadImageBuffer } from '../services/cloudinaryService.js';

import { getPublishedProjectDetails, getAdminProjectDetails } from '../services/projectService.js';

import { replaceProjectTechnologies } from '../models/projectTechnologyModel.js';

import { findImagesByProjectId } from '../models/projectImageModel.js';

import { deleteImageFromCloudinary } from '../services/cloudinaryService.js';

export async function getAllPublishedProjects(_req: Request, res: Response) {
  try {
    const projects = await findAllPublishedProjects();

    res.json(projects);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to fetch projects',
    });
  }
}

export async function getPublishedProjectById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid project id',
      });
    }

    const project = await getPublishedProjectDetails(id);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      });
    }

    res.json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to fetch project',
    });
  }
}

export async function getAllProjectsAdmin(_req: Request, res: Response) {
  try {
    const projects = await findAllProjects();

    res.json(projects);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to fetch projects',
    });
  }
}

export async function getProjectAdminById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid project id',
      });
    }

    const project = await getAdminProjectDetails(id);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      });
    }

    res.json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to fetch project',
    });
  }
}

export async function createProjectController(req: Request, res: Response) {
  try {
    const result = await createProject(req.body);

    res.status(201).json({
      message: 'Project created',
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to create project',
    });
  }
}

export async function updateProjectController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid project id',
      });
    }

    const project = await findProjectById(id);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      });
    }

    const result = await updateProject(id, {
      ...req.body,
      cover_image_url:
        req.body.cover_image_url !== undefined ? req.body.cover_image_url : project.cover_image_url,
    });

    res.json({
      message: 'Project updated',
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to update project',
    });
  }
}

export async function deleteProjectController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid project id',
      });
    }

    const project = await findProjectById(id);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      });
    }

    if (project.cover_image_url) {
      await deleteImageFromCloudinary(project.cover_image_url);
    }

    const images = await findImagesByProjectId(id);

    for (const image of images) {
      await deleteImageFromCloudinary(image.image_url);
    }

    await deleteProject(id);

    res.json({
      message: 'Project deleted',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to delete project',
    });
  }
}

export async function updateProjectTechnologies(req: Request, res: Response) {
  try {
    const projectId = Number(req.params.id);

    const { technologyIds } = req.body;

    if (Number.isNaN(projectId) || !Array.isArray(technologyIds)) {
      return res.status(400).json({
        message: 'Invalid data',
      });
    }

    await replaceProjectTechnologies(projectId, technologyIds);

    res.json({
      message: 'Project technologies updated',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to update project technologies',
    });
  }
}

export async function uploadProjectCoverController(req: Request, res: Response) {
  try {
    const projectId = Number(req.params.id);

    if (Number.isNaN(projectId) || !req.file) {
      return res.status(400).json({
        message: 'Invalid data',
      });
    }

    const project = await findProjectById(projectId);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      });
    }

    const oldCoverUrl = project.cover_image_url;

    const imageUrl = await uploadImageBuffer(
      req.file.buffer,
      `portfolio/projects`,
    );

    await updateProjectCoverImage(projectId, imageUrl);

    if (oldCoverUrl) {
      await deleteImageFromCloudinary(oldCoverUrl);
    }

    res.json({
      message: 'Cover image uploaded',
      cover_image_url: imageUrl,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to upload cover image',
    });
  }
}
