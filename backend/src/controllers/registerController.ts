import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';  
import { generateToken } from '../utils/jwtHelper';  
import Joi from 'joi';

// Skema validasi untuk input pengguna
const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('user', 'admin').default('user'),
});

export const registerController = async (req: Request, res: Response): Promise<void> => {
  // Validasi input menggunakan Joi
  const { error, value } = registerSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      status: 400,
      message: error.details.map(detail => detail.message), // Menampilkan semua pesan error
      data: [],
    });
    return;
  }

  const { username, email, password, role } = value;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(400).json({
        status: 400,
        message: 'Email is already registered',
        data: [],
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    res.status(201).json({
      status: 201,
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      },
    });
  } catch (error) {
    console.error('Error during user registration:', error); // Pastikan menghapusnya atau menggantinya dengan logger saat di production
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      data: [],
    });
  }
};
