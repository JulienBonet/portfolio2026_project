import { findProjectById } from '../models/projectModel.js';

import { findTechnologiesByProjectId } from '../models/technologyModel.js';

import { findImagesByProjectId } from '../models/projectImageModel.js';

export async function getProjectDetails(id: number) {
  const project = await findProjectById(id);

  if (!project) {
    return null;
  }

  const technologies = await findTechnologiesByProjectId(id);

  const images = await findImagesByProjectId(id);

  return {
    ...project,
    technologies,
    images,
  };
}
