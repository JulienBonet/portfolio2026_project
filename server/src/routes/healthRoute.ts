import { Router } from 'express';
import { testDatabaseConnection } from '../config/database.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    await testDatabaseConnection();

    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
    });
  }
});

export default router;
