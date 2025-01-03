var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken'; // Pastikan untuk import 'jsonwebtoken' sesuai versi yang digunakan
// Middleware untuk memverifikasi token JWT
export const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    // Pastikan header Authorization ada
    if (!authHeader) {
        res.status(401).json({ message: 'Authorization header missing' });
        return;
    }
    // Ambil token dari header "Authorization"
    const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"
    try {
        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Jika berhasil, simpan informasi user ke dalam request
        req.user = decoded; // Simpan decoded token ke request sebagai user
        next(); // Melanjutkan ke route handler berikutnya
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
});
