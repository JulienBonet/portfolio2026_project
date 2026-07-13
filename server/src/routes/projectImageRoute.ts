import { Router } from 'express';

import {
  getProjectImages,
  createProjectImageController,
  updateProjectImageController,
  deleteProjectImageController,
  uploadProjectImageController,
} from '../controllers/projectImageController.js';

import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js';

import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

// public
router.get('/:id/images', getProjectImages);

// admin
router.post('/:id/images', adminAuthMiddleware, createProjectImageController);
router.post(
  '/:id/images/upload',
  adminAuthMiddleware,
  upload.single('image'),
  uploadProjectImageController,
);
router.put('/:projectId/images/:imageId', adminAuthMiddleware, updateProjectImageController);
router.delete('/:projectId/images/:imageId', adminAuthMiddleware, deleteProjectImageController);

export default router;
