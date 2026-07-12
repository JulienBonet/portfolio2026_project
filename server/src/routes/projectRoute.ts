import { Router } from 'express';

import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js';

import {
  getAllPublishedProjects,
  getProjectById,
  createProjectController,
  updateProjectController,
  deleteProjectController,
} from '../controllers/projectController.js';

const router = Router();

// public

router.get('/', getAllPublishedProjects);
router.get('/:id', getProjectById);

// admin
router.post('/', adminAuthMiddleware, createProjectController);
router.put('/:id', adminAuthMiddleware, updateProjectController);
router.delete('/:id', adminAuthMiddleware, deleteProjectController);

export default router;
