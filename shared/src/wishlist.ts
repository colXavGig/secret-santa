import { z } from 'zod';

export const WISHLIST_VALIDATION_ERRORS = {
	NAME_TOO_SHORT: "name_too_short",
} as const;

export const WishListItemSchema = z.object({
	name: z.string().trim().min(2, WISHLIST_VALIDATION_ERRORS.NAME_TOO_SHORT),
	description: z.string().optional(),
	link: z.string().url().optional().or(z.literal('')),
});

export const WishListSchema = z.object({
	owner_email: z.string().email(),
	content: z.array(WishListItemSchema),
});

export type WishlistValidationError = typeof WISHLIST_VALIDATION_ERRORS[keyof typeof WISHLIST_VALIDATION_ERRORS];
export type WishListItem = z.infer<typeof WishListItemSchema>;
export type WishList = z.infer<typeof WishListSchema>;
