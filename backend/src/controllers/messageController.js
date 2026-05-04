import { Message } from '../data/Message.js';
import { Group } from '../data/Group.js';

export const getMessages = async (req, res) => {
    const { groupId, userId } = req.params;
    // We get messages where (sender=me AND receiver=userId) OR (sender=userId AND receiver=me)
    const messages = await Message.find({
        group: groupId,
        $or: [
            { sender: req.user._id, receiver: userId },
            { sender: userId, receiver: req.user._id }
        ]
    }).sort('createdAt');
    res.json(messages);
};

export const sendMessage = async (req, res) => {
    const { groupId, receiverId } = req.params;
    const { message } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    // Check if sender is santa or giftee
    const isSanta = group.pairs.some(p => p.santa.toString() === req.user._id.toString() && p.giftee.toString() === receiverId);
    
    const msg = await Message.create({
        group: groupId,
        sender: req.user._id,
        receiver: receiverId,
        content: message,
        isAnonymous: isSanta
    });

    const io = req.app.get('io');
    io.to(receiverId).emit('message_received', {
        groupId,
        message: msg
    });

    res.status(201).json(msg);
};
