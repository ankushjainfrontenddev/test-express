import { Router } from 'express';
import * as homeController from '@/controllers/home';
const router = Router();

router.get('/health', homeController.healthCheck);

export default router;
