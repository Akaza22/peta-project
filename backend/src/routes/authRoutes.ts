import express, { Response } from 'express';
import { loginController } from '../controllers/loginController';
import { registerController } from '../controllers/registerController';
import { authMiddleware } from '../middlewares/authMiddleware';  // Mengimpor authMiddleware yang sudah mencakup roleMiddleware
import { validate } from '../middlewares/validate';
import Joi from 'joi';
import { deleteUser, editUser } from '../controllers/userController';

const router = express.Router();

// Skema validasi untuk registrasi
const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('user', 'admin').default('user'),
});

router.post('/register', validate(registerSchema), registerController);
router.post('/login', loginController);

// Route yang dilindungi dan hanya bisa diakses oleh admin
router.get('/admin-dashboard', authMiddleware(['admin']), (req: any, res: Response) => {
  res.status(200).json({ message: 'Welcome to the admin dashboard!' });
})

// Test Route untuk memeriksa apakah autentikasi bekerja
router.get('/test', authMiddleware(['user', 'admin']), (req: any, res: Response) => {
  res.status(200).json({ message: 'This is a protected route!', user: req.user });
});

router.delete(
  '/users/:id',
  authMiddleware(['admin']),
  deleteUser
);

router.put(
  '/users/:id',
  authMiddleware(['admin']),
  editUser
);

export default router;
