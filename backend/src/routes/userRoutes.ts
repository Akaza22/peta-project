import express, { Response } from 'express';
import { deleteUser, editUser, getAllUsers } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';


const router = express.Router();

// Route yang dilindungi dan hanya bisa diakses oleh admin
router.get('/admin-dashboard', authMiddleware(['admin']), (req: any, res: Response) => {
  res.status(200).json({ message: 'Welcome to the admin dashboard!' });
})

// Test Route untuk memeriksa apakah autentikasi bekerja
router.get('/easterregg', authMiddleware(['user', 'admin']), (req: any, res: Response) => {
  res.status(200).json({ message: 'testing pull request', user: req.user });
});

// Test Route untuk melihat seluruh user yang terdaftar
router.get('/allUsers', authMiddleware(['admin']), getAllUsers);

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

