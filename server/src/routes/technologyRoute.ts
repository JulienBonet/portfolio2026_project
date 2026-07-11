import { Router } from "express";
import { getTechnologies, getTechnologiesFeatured } from "../controllers/technologyController.js";

const router = Router();

router.get("/", getTechnologies);
router.get("/featured", getTechnologiesFeatured);

export default router;