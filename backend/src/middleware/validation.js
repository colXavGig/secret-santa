
/**
 * Express middleware to validate request body against a Zod schema.
 * @param {import("zod/v3").AnyZodObject} schema - The Zod schema to validate against.
 * @returns {import('express').RequestHandler} - An Express middleware function.
 */
export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.errors
        });
    }
};
