import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    // If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username },
    });
    if (!user) {
        return res.status(401).json({ message: 'No valid user' });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(401).json({
            message: 'No valid password'
        });
    }
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '2h' });
    return res.json({ token });
};
export const signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({
            where: { username },
        });
        if (user) {
            return res.status(401).json({ message: 'Login already exists' });
        }
        await User.create({ username, password });
        const secretKey = process.env.JWT_SECRET_KEY || '';
        const token = jwt.sign({ username }, secretKey, { expiresIn: '2h' });
        return res.json({ token });
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
const router = Router();
// Login a user
router.post('/login', login);
export default router;
