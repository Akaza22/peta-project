import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createTask, editTask, getTasksByProjectId, getTasksByUserId } from '../controllers/TaskController';

const router = express.Router();

// Route to create a new task
router.post('/create', authMiddleware(['user', 'admin']), createTask);
// Route to get tasks by project ID
router.get('/project/:projectId', authMiddleware(['user', 'admin']), getTasksByProjectId);
// Route to get tasks by user ID
router.get('/user', authMiddleware(['user', 'admin']), getTasksByUserId);
// Route to edit a task by ID
router.put('/:id', authMiddleware(['user', 'admin']), editTask);



export default router;