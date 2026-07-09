import { Router } from 'express';

import healthRoute from './routes/healthRoute.js';

const router = Router();

router.use('/health', healthRoute);

export default router;
