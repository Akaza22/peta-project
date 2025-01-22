import express from 'express';
import { createProject, getUserProjects } from '../controllers/ProjectController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Route to create a new project
router.post('/project', authMiddleware(['user', 'admin']), createProject);
router.get('/project/my', authMiddleware(['user', 'admin']), getUserProjects);

export default router;