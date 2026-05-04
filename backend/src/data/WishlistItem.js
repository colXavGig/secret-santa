import mongoose from 'mongoose';

const wishlistItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    name: { type: String, required: true },
    description: { type: String },
    link: { type: String }
}, { timestamps: true });

export const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);
