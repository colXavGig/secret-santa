import { z } from 'zod';

export const MESSAGE_VALIDATION_ERRORS = {
	MESSAGE_TOO_SHORT: "message_too_short"
} as const;

export const MessageSchema = z.object({
	message: z.string().trim().min(1, MESSAGE_VALIDATION_ERRORS.MESSAGE_TOO_SHORT)
});

export const ConversationSchema = z.object({
	giftee_email: z.string().email(),
	secret_santa_id: z.string().uuid(),
	messages: z.array(MessageSchema)
});

export type MessageValidationError = typeof MESSAGE_VALIDATION_ERRORS[keyof typeof MESSAGE_VALIDATION_ERRORS]
export type Message = z.infer<typeof MessageSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;
