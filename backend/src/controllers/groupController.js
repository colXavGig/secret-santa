import { Group } from '../data/Group.js';

export const createGroup = async (req, res) => {
    const { name, description } = req.body;
    const group = await Group.create({
        name,
        description,
        admin: req.user._id,
        members: [req.user._id]
    });
    res.status(201).json(group);
};

export const getGroups = async (req, res) => {
    const groups = await Group.find({ members: req.user._id }).populate('admin', 'username email');
    res.json(groups);
};

export const getGroupById = async (req, res) => {
    const group = await Group.findById(req.params.id)
        .populate('admin', 'username email')
        .populate('members', 'username email')
        .populate('pairs.santa', 'username email')
        .populate('pairs.giftee', 'username email');
    
    if (group) {
        // Obfuscate pairs if not admin and matched
        // A user only needs to know their giftee
        const isMember = group.members.some(m => m._id.toString() === req.user._id.toString());
        if (!isMember) {
             return res.status(403).json({ message: 'Not authorized' });
        }
        res.json(group);
    } else {
        res.status(404).json({ message: 'Group not found' });
    }
};

export const joinGroup = async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    if (group.status !== 'open') return res.status(400).json({ message: 'Group already matched' });

    if (!group.members.includes(req.user._id)) {
        group.members.push(req.user._id);
        await group.save();
    }
    res.json(group);
};

export const drawPairs = async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    if (group.admin.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });
    if (group.status !== 'open') return res.status(400).json({ message: 'Already matched' });
    if (group.members.length < 3) return res.status(400).json({ message: 'Need at least 3 members' });

    let members = [...group.members];
    let pairs = [];
    let shuffled = [...members].sort(() => 0.5 - Math.random());
    
    while (shuffled.some((val, i) => val.toString() === members[i].toString())) {
        shuffled = [...members].sort(() => 0.5 - Math.random());
    }

    for (let i = 0; i < members.length; i++) {
        pairs.push({ santa: members[i], giftee: shuffled[i] });
    }

    group.pairs = pairs;
    group.status = 'matched';
    await group.save();

    res.json(group);
};
