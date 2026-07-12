import { Router } from "express";

import { loginController } from "../controllers/authController.js";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";

const router = Router();

router.post(
  "/login",
  loginController,
);

router.get(
  "/me",
  adminAuthMiddleware,
  (req, res) => {
    res.json(req.user);
  },
);

export default router;