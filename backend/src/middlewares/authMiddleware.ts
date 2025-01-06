import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: jwt.JwtPayload & { role?: string }; // Menambahkan properti role ke payload
}

// Middleware untuk memverifikasi token JWT dan pengecekan role
export const authMiddleware = (allowedRoles: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authorization header missing or invalid format' });
      return; // Jangan lupa return setelah merespons
    }

    const token = authHeader.split(' ')[1];

    try {
      // Memverifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

      // Menyisipkan user ke dalam request untuk digunakan di controller selanjutnya
      req.user = decoded;

      // Memastikan role sesuai dengan yang diizinkan
      if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
        res.status(403).json({ message: 'Access denied' });
        return; // Jangan lupa return setelah merespons
      }

      next();
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        res.status(403).json({ message: 'Token expired' });
      } else {
        res.status(403).json({ message: 'Invalid token' });
      }
      return; // Jangan lupa return setelah merespons
    }
  };
};
