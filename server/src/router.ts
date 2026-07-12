import { Router } from 'express';

import healthRoute from './routes/healthRoute.js';
import technologyRoute from "./routes/technologyRoute.js";
import authRoute from "./routes/authRoute.js";

const router = Router();

router.use('/health', healthRoute);
router.use("/technologies", technologyRoute);
router.use("/auth", authRoute);

export default router;
