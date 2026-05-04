import { z } from 'zod';

export const GROUP_VALIDATION_ERRORS = {
	NAME_TOO_SHORT: "name_too_short",
	NAME_TOO_LONG: "name_too_long",
} as const;

export const GroupSchema = z.object({
	name: z.string()
		.min(3, GROUP_VALIDATION_ERRORS.NAME_TOO_SHORT)
		.max(50, GROUP_VALIDATION_ERRORS.NAME_TOO_LONG),
	description: z.string().optional(),
});

export const GroupMemberSchema = z.object({
	email: z.string().email()
});

export type GroupValidationError = typeof GROUP_VALIDATION_ERRORS[keyof typeof GROUP_VALIDATION_ERRORS];
export type Group = z.infer<typeof GroupSchema>;
export type GroupMember = z.infer<typeof GroupMemberSchema>;
