import { Request, Response } from 'express';
import { Comment, Task, User } from '../models/Relation';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';


// Create a new comment
export const createComment = async (req: AuthenticatedRequest, res: Response) => {
  const { task_id, content, parent_id } = req.body;
  const user_id = req.user?.id; 

  if (!user_id) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }

  try {
    // Check if the task exists
    const task = await Task.findByPk(task_id);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

      // Check if the parent comment exists if parent_id is provided
    if (parent_id) {
      const parentComment = await Comment.findByPk(parent_id);
      if (!parentComment) {
        res.status(404).json({ message: 'Parent comment not found' });
        return;
      }
    }

    // Create the new comment
    const newComment = await Comment.create({
      task_id,
      user_id,
      content,
      parent_id
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

//get comments by task id
export const getCommentsByTaskId = async (req: Request, res: Response) => {
  const { task_id } = req.params;

  try {
    // Fetch all comments for the task
    const allComments = await Comment.findAll({
      where: { task_id },
      include: [
        { model: User, as: 'User', attributes: ['name'] }, // Include user data
      ],
      order: [['createdAt', 'ASC']], // Order comments by createdAt
    });

    // Helper function to build nested comment structure
    const buildCommentTree = (parentId: string | null, comments: Comment[]): any[] => {
      return comments
        .filter(comment => comment.parent_id === parentId)
        .map(comment => ({
          ...comment.toJSON(), // Convert Sequelize instance to plain object
          replies: buildCommentTree(comment.id, comments), // Recursively build child comments
        }));
    };

    // Generate tree starting from root (parent_id = null)
    const commentTree = buildCommentTree(null, allComments);

    res.status(200).json({
      message: 'Comments fetched successfully',
      status: 200,
      data: commentTree,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


