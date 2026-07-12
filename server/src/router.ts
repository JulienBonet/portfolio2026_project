import { Router } from 'express';

import healthRoute from './routes/healthRoute.js';
import technologyRoute from "./routes/technologyRoute.js";
import authRoute from "./routes/authRoute.js";
import projectRoute from "./routes/projectRoute.js";

const router = Router();

router.use('/health', healthRoute);
router.use("/technologies", technologyRoute);
router.use("/auth", authRoute);
router.use("/projects", projectRoute);

export default router;
