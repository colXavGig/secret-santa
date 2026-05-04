import mongoose from "mongoose";

const WishlistItemEntitySchema = mongoose.Schema({
	name: { type: String, required: true },
	description: String,
	link: String,
});

const WishlistEntitySchema = mongoose.Schema({
	owner_email: { type: String, required: true, unique: true },
	content: { type: [WishlistItemEntitySchema] },
});

export const WishlistItemEntity = mongoose.model('WishlistEntity', WishlistItemEntitySchema);
export const WishlistEntity = mongoose.model('WishlistEntity', WishlistEntitySchema);
