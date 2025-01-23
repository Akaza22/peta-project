import { Request, Response } from 'express';
import { Project, User } from '../models/Relation';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

// Create a new project
export const createProject = async (req: AuthenticatedRequest, res: Response) => {
  const { name, description } = req.body;
  const ownerId = req.user?.id; // Assuming user ID is available in req.user.id

  if (!ownerId) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }

  try {
    const newProject = await Project.create({ name, description, ownerId });
    const user = await User.findByPk(ownerId);

    res.status(201).json({ 
      message: 'Project created successfully', 
      status: 201,
      data: {
        project: newProject, 
        user: {
        name: user?.name
        }
      }
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get projects by user ID
export const getUserProjects = async (req: AuthenticatedRequest, res: Response) => {
  const ownerId = req.user?.id; // Assuming user ID is available in req.user.id

  if (!ownerId) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }

  try {
    const user = await User.findByPk(ownerId);
    const projects = await Project.findAll({ where: { ownerId } });
    res.status(200).json({ 
      message: 'Projects fetched successfully', 
      status: 200,
      data: projects,user:{name:user?.name}
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Edit project by ID
export const editProject = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const ownerId = req.user?.id; // Assuming user ID is available in req.user.id

  if (!ownerId) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }

  try {
    const user = await User.findByPk(ownerId);
    const project = await Project.findOne({ where: { id, ownerId } });

    if (!project) {
      res.status(404).json({ message: 'Project not found or you do not have permission to edit this project' });
      return;
    }

    project.name = name || project.name;
    project.description = description || project.description;

    await project.save();

    res.status(200).json({ 
      message: 'Project updated successfully', 
      status: 200,
      data: {
        project,
        user:{
            name:user?.name
            } 
        } 
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete project by ID
export const deleteProject = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const ownerId = req.user?.id; // Assuming user ID is available in req.user.id

  if (!ownerId) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }

  try {
    const project = await Project.findOne({ where: { id, ownerId } });

    if (!project) {
      res.status(404).json({ message: 'Project not found or you do not have permission to delete this project' });
      return;
    }

    await project.destroy();

    res.status(200).json({ 
      message: 'Project deleted successfully', 
      status: 200
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};