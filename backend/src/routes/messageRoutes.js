import express from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { MessageSchema } from '@secret-santa/shared';

const router = express.Router();

router.get('/:groupId/:userId', protect, getMessages);
router.post('/:groupId/:receiverId', protect, validate(MessageSchema), sendMessage);

export default router;
