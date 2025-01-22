import express, { Response } from 'express';
import { loginController } from '../controllers/loginController';
import { registerController } from '../controllers/registerController';
import { validate } from '../middlewares/validate';
import Joi from 'joi';


const router = express.Router();

// Skema validasi untuk registrasi
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('user', 'admin').default('user'),
});

router.post('/register', validate(registerSchema), registerController);
router.post('/login', loginController);



export default router;
