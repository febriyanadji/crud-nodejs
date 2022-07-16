import { expressjwt } from 'express-jwt';
import { validationResult } from 'express-validator';
import { JWT_SECRET } from '../config.js';

export const validateBody = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export const authLevel = (roles) => {
  return (req, res, next) => {
    if (req.auth.isAdmin && roles.includes('admin')) {
      return next();
    } else if (!req.auth.isAdmin && roles.includes('user')) {
      return next();
    }

    return res.status(401).json({ message: 'forbidden' });
  };
};

export const handleUnauthorized = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    next(err);
  }
};

export const applyJWT = expressjwt({
  secret: JWT_SECRET,
  algorithms: ['HS256'],
}).unless({
  path: ['/auth/login', '/auth/token', '/', '/healthz'],
});
