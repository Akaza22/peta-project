var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import User from '../models/User'; // Import model User Anda
import { generateToken } from '../utils/jwtHelper'; // Fungsi generateToken untuk menghasilkan JWT
export const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Cari pengguna berdasarkan email menggunakan Sequelize
        const user = yield User.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({
                status: 401,
                message: 'Invalid credentials',
                data: [],
            });
            return;
        }
        // Validasi password
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                status: 401,
                message: 'Invalid credentials',
                data: [],
            });
            return;
        }
        // Generate token
        const token = generateToken({ id: user.id });
        // Kembalikan token dalam response
        res.status(200).json({
            status: 200,
            message: 'Login successful',
            data: { token },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            data: [],
        });
    }
});
