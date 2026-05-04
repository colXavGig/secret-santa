import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { UserRegisterSchema, UserLoginSchema } from '@secret-santa/shared';

const router = express.Router();

router.post('/register', validate(UserRegisterSchema), registerUser);
router.post('/login', validate(UserLoginSchema), loginUser);
router.get('/me', protect, getMe);

export default router;
