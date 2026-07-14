import {
  findProjectById,
  findPublishedProjectById,
} from '../models/projectModel.js';

import { findTechnologiesByProjectId } from '../models/technologyModel.js';

import { findImagesByProjectId } from '../models/projectImageModel.js';


async function buildProjectDetails(
  project: Awaited<ReturnType<typeof findProjectById>>,
  id: number,
) {
  if (!project) {
    return null;
  }

  const technologies =
    await findTechnologiesByProjectId(id);

  const images =
    await findImagesByProjectId(id);

  return {
    ...project,
    technologies,
    images,
  };
}


export async function getAdminProjectDetails(
  id: number,
) {
  const project =
    await findProjectById(id);

  return buildProjectDetails(project, id);
}


export async function getPublishedProjectDetails(
  id: number,
) {
  const project =
    await findPublishedProjectById(id);

  return buildProjectDetails(project, id);
}
