import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/Relation';  
import { generateToken } from '../utils/jwtHelper';  // Fungsi generateToken untuk menghasilkan JWT
import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = loginSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      status: 400,
      message: error.details[0].message,
      data: [],
    });
    return;
  }

  const { email, password } = value;
  
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({
        status: 401,
        message: 'Invalid credentials',
        data: [],
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        status: 401,
        message: 'Invalid credentials',
        data: [],
      });
      return;
    }

    const token = generateToken({ 
      id: user.id,
      email: user.email,
      role: user.role
    });

    res.status(200).json({
      status: 200,
      message: 'Login successful',
      data: { token },
      user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
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
