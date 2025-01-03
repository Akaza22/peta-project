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
export const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        // Cek apakah email sudah terdaftar menggunakan Sequelize
        const existingUser = yield User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({
                status: 400,
                message: 'Email is already registered',
                data: [],
            });
            return;
        }
        // Enkripsi password
        const hashedPassword = yield bcrypt.hash(password, 10);
        // Simpan pengguna baru ke database menggunakan Sequelize
        const newUser = yield User.create({
            username,
            email,
            password: hashedPassword,
        });
        // Generate token untuk user yang baru terdaftar
        const token = generateToken({ id: newUser.id });
        // Kembalikan response sukses dengan data token
        res.status(201).json({
            status: 201,
            message: 'User registered successfully',
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
