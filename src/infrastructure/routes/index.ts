import { Router } from 'express';
import ipRoutes from './ip-routes';

const router = Router();

// List all routes
router.use('/ip', ipRoutes);

export default router;
