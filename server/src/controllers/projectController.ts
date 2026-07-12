import { Request, Response } from 'express';

import { findAllPublishedProjects} from '../models/projectModel.js';

import { getProjectDetails } from '../services/projectService.js';

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

export async function getProjectById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid project id',
      });
    }

    const project = await getProjectDetails(id);

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
