import { getProjects } from "./projects.api";
import { getTechnologies } from "./technologies.api";

export async function getDashboardStats() {
  const [
    projects,
    technologies,
  ] = await Promise.all([
    getProjects(),
    getTechnologies(),
  ]);

  return {
    projectsCount: projects.length,

    technologiesCount:
      technologies.length,

    publishedProjects:
      projects.filter(
        (project) =>
          project.status === "published",
      ).length,

    draftProjects:
      projects.filter(
        (project) =>
          project.status === "draft",
      ).length,
  };
}