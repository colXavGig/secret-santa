import express from 'express';
import { getWishlist, addWishlistItem, deleteWishlistItem } from '../controllers/wishlistController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { WishListItemSchema } from '@secret-santa/shared';

const router = express.Router();

router.get('/:groupId/:userId', protect, getWishlist);
router.post('/:groupId', protect, validate(WishListItemSchema), addWishlistItem);
router.delete('/:id', protect, deleteWishlistItem);

export default router;
