import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';  // Import model User Anda
import { generateToken } from '../utils/jwtHelper';  // Fungsi generateToken untuk menghasilkan JWT

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email menggunakan Sequelize
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({
        status: 401,
        message: 'Invalid credentials',
        data: [],
      });
      return;
    }

    // Validasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      data: [],
    });
  }
};
