import { Router } from 'express';
import * as chatbotController from '@/controllers/chatbot';
const router = Router();

router.get('/getresponse', chatbotController.getResponse);
router.post('/get-response', chatbotController.getResponse);
router.post('/create-user', chatbotController.cretaeUser);
export default router;
