import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';  // Pastikan untuk import 'jsonwebtoken' sesuai versi yang digunakan

// Middleware untuk memverifikasi token JWT
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  // Pastikan header Authorization ada
  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header missing' });
    return;
  }

  // Ambil token dari header "Authorization"
  const token = authHeader.split(' ')[1];  // Format: "Bearer <token>"

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    // Jika berhasil, simpan informasi user ke dalam request
    (req as any).user = decoded;  // Simpan decoded token ke request sebagai user

    next();  // Melanjutkan ke route handler berikutnya
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
