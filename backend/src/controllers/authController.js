import jwt from 'jsonwebtoken';
import { User } from '../data/User.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_christmas_key', {
        expiresIn: '30d',
    });
};

export const registerUser = async (req, res) => {
    const { email, username, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, username, password });
    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            username: user.username,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

export const getMe = async (req, res) => {
    res.status(200).json(req.user);
};
