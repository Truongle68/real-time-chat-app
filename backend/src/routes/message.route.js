import express from 'express';
import { getMessagesController, getUsersForSidebarController, sendMessageController } from '../controllers/message.controller.js';
import { authenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

export default router;

router.get('/users', authenticated, getUsersForSidebarController)

router.post('/send/:id', authenticated, sendMessageController)

router.get('/get/:id',authenticated, getMessagesController)