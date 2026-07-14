import { Router } from 'express';

import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js';

import {
  getAllPublishedProjects,
  createProjectController,
  updateProjectController,
  deleteProjectController,
  updateProjectTechnologies,
  getPublishedProjectById,
  getAllProjectsAdmin,
  getProjectAdminById,
  uploadProjectCoverController,
} from '../controllers/projectController.js';

import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

// Public liste
router.get('/', getAllPublishedProjects);

// Admin
router.get('/admin', adminAuthMiddleware, getAllProjectsAdmin);
router.get('/admin/:id', adminAuthMiddleware, getProjectAdminById);

router.post('/', adminAuthMiddleware, createProjectController);
router.post(
  '/:id/cover/upload',
  adminAuthMiddleware,
  upload.single('image'),
  uploadProjectCoverController,
);
router.put('/:id', adminAuthMiddleware, updateProjectController);
router.delete('/:id', adminAuthMiddleware, deleteProjectController);
router.put('/:id/technologies', adminAuthMiddleware, updateProjectTechnologies);

// Public détail
router.get('/:id', getPublishedProjectById);

export default router;
