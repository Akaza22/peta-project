import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';  
import { generateToken } from '../utils/jwtHelper';  

export const registerController = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar menggunakan Sequelize
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(400).json({
        status: 400,
        message: 'Email is already registered',
        data: [],
      });
      return;
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru ke database menggunakan Sequelize
    const newUser = await User.create({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      data: [],
    });
  }
};
