import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createComment, getCommentsByTaskId } from '../controllers/CommentController';


const router = express.Router();

router.post('/create', authMiddleware(['user', 'admin']), createComment);
router.get('/task/:task_id', authMiddleware(['user', 'admin']), getCommentsByTaskId);

export default router;
