import { Request, Response } from 'express';

import { createProject, deleteProject, findAllPublishedProjects, updateProject} from '../models/projectModel.js';

import { getProjectDetails } from '../services/projectService.js';
import { replaceProjectTechnologies } from '../models/projectTechnologyModel.js';

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

export async function createProjectController(
  req: Request,
  res: Response,
) {
  try {

    const result = await createProject(req.body);

    res.status(201).json({
      message: "Project created",
      result,
    });

  } catch(error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to create project",
    });
  }
}

export async function updateProjectController(
  req: Request,
  res: Response,
) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid project id",
      });
    }

    const result = await updateProject(
      id,
      req.body,
    );

    res.json({
      message: "Project updated",
      result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update project",
    });
  }
}

export async function deleteProjectController(
  req: Request,
  res: Response,
) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid project id",
      });
    }

    const result = await deleteProject(id);

    res.json({
      message: "Project deleted",
      result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete project",
    });
  }
}

export async function updateProjectTechnologies(
  req: Request,
  res: Response,
) {
  try {
    const projectId = Number(req.params.id);

    const { technologyIds } = req.body;

    if (
      Number.isNaN(projectId) ||
      !Array.isArray(technologyIds)
    ) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    await replaceProjectTechnologies(
      projectId,
      technologyIds,
    );

    res.json({
      message: "Project technologies updated",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update project technologies",
    });
  }
}