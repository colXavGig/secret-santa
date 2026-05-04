import { z } from 'zod';

export const AUTH_VALIDATION_ERRORS = {
	USERNAME_TOO_SHORT: "username_too_short",
	PASSWORD_TOO_SHORT: "password_too_short",
	PASSWORD_TOO_LONG: "password_too_long",
	PASSWORD_NEED_LOWER: "password_need_lowercase",
	PASSWORD_NEED_UPPER: "password_need_uppercase",
	PASSWORD_NEED_NUMBER: "password_need_number",
	PASSWORD_EMPTY: "password_empty",
	INVALID_EMAIL: "invalid_email",
	CONFIRM_MISMATCH: "confirm_password_dont_match",
} as const;

export const PasswordSchema = z.string()
	.min(8, AUTH_VALIDATION_ERRORS.PASSWORD_TOO_SHORT)
	.max(100, AUTH_VALIDATION_ERRORS.PASSWORD_TOO_LONG)
	.regex(/[a-z]/, AUTH_VALIDATION_ERRORS.PASSWORD_NEED_LOWER)
	.regex(/[A-Z]/, AUTH_VALIDATION_ERRORS.PASSWORD_NEED_UPPER)
	.regex(/[0-9]/, AUTH_VALIDATION_ERRORS.PASSWORD_NEED_NUMBER);

export const UserLoginSchema = z.object({
	email: z.string().email(AUTH_VALIDATION_ERRORS.INVALID_EMAIL),
	password: z.string().nonempty(AUTH_VALIDATION_ERRORS.PASSWORD_EMPTY),
});

export const UserRegisterSchema = z.object({
	email: z.string().email(AUTH_VALIDATION_ERRORS.INVALID_EMAIL),
	username: z.string().min(3, AUTH_VALIDATION_ERRORS.USERNAME_TOO_SHORT),
	password: PasswordSchema,
	confirmPassword: z.string(),
})
	.refine(data => data.password === data.confirmPassword, {
		message: AUTH_VALIDATION_ERRORS.CONFIRM_MISMATCH,
		path: ['confirmPassword'],
	});

export type AuthValidationError = typeof AUTH_VALIDATION_ERRORS[keyof typeof AUTH_VALIDATION_ERRORS];
export type Password = z.infer<typeof PasswordSchema>
export type UserLogin = z.infer<typeof UserLoginSchema>
export type UserRegister = z.infer<typeof UserRegisterSchema>
