import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// This block of code adds a new 'user' property to the Express Request type.
// This allows us to attach the decoded token payload to the request.
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format is "Bearer TOKEN"

  if (token == null) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    
    // If the token is valid, attach the decoded user payload to the request object.
    req.user = user;
    
    // Pass control to the next function in the chain (the controller).
    next();
  });
};