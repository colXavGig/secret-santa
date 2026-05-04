import mongoose from 'mongoose';

const UserEntitySchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password_hash: { type: String, required: true }
});

export const UserEntity = mongoose.model('UserEntity', UserEntitySchema)
