import { Router } from 'express';

import healthRoute from './routes/healthRoute.js';
import technologyRoute from "./routes/technologyRoute.js";

const router = Router();

router.use('/health', healthRoute);
router.use("/technologies", technologyRoute);

export default router;
