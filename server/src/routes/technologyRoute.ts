import { Router } from "express";

import {
  getTechnologies,
  getTechnologiesFeatured,
  getTechnologyById,
  createTechnologyController,
  updateTechnologyController,
  deleteTechnologyController,
  uploadTechnologyIconController,
} from "../controllers/technologyController.js";

import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";

import { upload } from "../middleware/uploadMiddleware.js";


const router = Router();


// Public
router.get(
  "/",
  getTechnologies,
);

router.get(
  "/featured",
  getTechnologiesFeatured,
);

router.get("/:id", getTechnologyById);


// Admin
router.post(
  "/",
  adminAuthMiddleware,
  createTechnologyController,
);

router.post(
  "/:id/icon/upload",
  adminAuthMiddleware,
  upload.single("image"),
  uploadTechnologyIconController,
);

router.put(
  "/:id",
  adminAuthMiddleware,
  updateTechnologyController,
);

router.delete(
  "/:id",
  adminAuthMiddleware,
  deleteTechnologyController,
);


export default router;