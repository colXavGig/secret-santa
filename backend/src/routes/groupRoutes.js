import express from 'express';
import { createGroup, getGroups, getGroupById, joinGroup, drawPairs } from '../controllers/groupController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { GroupSchema } from '@secret-santa/shared';

const router = express.Router();

router.route('/')
    .get(protect, getGroups)
    .post(protect, validate(GroupSchema), createGroup);

router.route('/:id')
    .get(protect, getGroupById);

router.post('/:id/join', protect, joinGroup);
router.post('/:id/draw', protect, drawPairs);

export default router;
