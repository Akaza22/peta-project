import express from 'express';
import { loginController } from '../controllers/loginController';
import { registerController } from '../controllers/registerController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

router.get('/test', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'This is a protected route!', user: (req as any).user });
});

export default router;
