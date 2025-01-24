import { Request, Response } from 'express';
import { Comment, Task, User } from '../models/Relation';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

// Create a new comment
export const createComment = async (req: AuthenticatedRequest, res: Response) => {
  const { taskId, content } = req.body;
  const userId = req.user?.id; // Assuming user ID is available in req.user.id

  if (!userId) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }

  try {
    // Check if the task exists
    const task = await Task.findByPk(taskId);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Create the new comment
    const newComment = await Comment.create({
      taskId,
      userId,
      content
    });

    res.status(201).json({
      message: 'Comment created successfully',
      status: 201,
      data: newComment
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

