import { Router } from "express";

import { getAllPublishedProjects, getProjectById } from "../controllers/projectController.js";

const router = Router();

router.get("/", getAllPublishedProjects);

router.get("/:id", getProjectById);

export default router;