import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'node:crypto';
import { isMongoConnected } from '../config/db.js';
import { User } from '../models/index.js';

const jwtSecret = process.env.JWT_SECRET || randomBytes(32).toString('hex');

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    let user;
    if (isMongoConnected) {
      user = await User.findOne({ username }).select('+password');
    } else if (
      username === (process.env.ADMIN_USERNAME || 'admin') &&
      password === (process.env.ADMIN_PASSWORD || 'admin123')
    ) {
      user = { _id: 'local-admin', username, name: 'College Admin', role: 'admin' };
    }

    const validPassword = user && user.password
      ? await bcrypt.compare(password, user.password)
      : Boolean(user);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    const userData = {
      id: String(user._id),
      username: user.username,
      name: user.name,
      role: user.role
    };
    const token = jwt.sign(userData, jwtSecret, { expiresIn: '8h' });
    res.json({ success: true, token, user: userData });
  } catch (error) {
    next(error);
  }
};

export const getMe = (req, res) => {
  res.json({ success: true, user: req.user });
};

export { jwtSecret };
