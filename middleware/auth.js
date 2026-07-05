import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>" → just the token part

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // now every route handler downstream can read req.user
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}