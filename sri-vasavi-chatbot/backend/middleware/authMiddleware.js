import jwt from 'jsonwebtoken';
import { jwtSecret } from '../controllers/authController.js';

export const protectAdmin = (req, res, next) => {
  const authorization = req.get('Authorization') || '';
  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ success: false, message: 'Admin authentication is required.' });
  }

  try {
    const user = jwt.verify(token, jwtSecret);
    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access is required.' });
    }
    req.user = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    };
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Admin token is invalid or expired.' });
  }
};
