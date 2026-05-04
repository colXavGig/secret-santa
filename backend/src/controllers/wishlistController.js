import { WishlistItem } from '../data/WishlistItem.js';
import { Group } from '../data/Group.js';

export const getWishlist = async (req, res) => {
    const { groupId, userId } = req.params;
    const items = await WishlistItem.find({ group: groupId, user: userId });
    res.json(items);
};

export const addWishlistItem = async (req, res) => {
    const { groupId } = req.params;
    const { name, description, link } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const item = await WishlistItem.create({
        user: req.user._id,
        group: groupId,
        name,
        description,
        link
    });

    // Notify the secret santa (the person who has this user as giftee)
    const pair = group.pairs.find(p => p.giftee.toString() === req.user._id.toString());
    if (pair) {
        const io = req.app.get('io');
        io.to(pair.santa.toString()).emit('wishlist_added', {
            groupId,
            gifteeId: req.user._id,
            item
        });
    }

    res.status(201).json(item);
};

export const deleteWishlistItem = async (req, res) => {
    const item = await WishlistItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });

    await item.deleteOne();
    res.json({ message: 'Item removed' });
};
