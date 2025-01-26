import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createComment, deleteComment, getCommentsByTaskId } from '../controllers/CommentController';


const router = express.Router();

// Route to create a new comment
router.post('/create', authMiddleware(['user', 'admin']), createComment);

// Route to get comments by task ID
router.get('/task/:task_id', authMiddleware(['user', 'admin']), getCommentsByTaskId);

// Route to delete a comment by ID
router.delete('/:id', authMiddleware(['user', 'admin']), deleteComment);
export default router;
