import { Request, Response } from "express";
import { Task, Project, User } from "../models/Relation";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

// Create a new task
export const createTask = async (req: AuthenticatedRequest, res: Response) => {
    const { projectId, name, description, assigneeId, dueDate } = req.body;
    const ownerId = req.user?.id;

    if(!ownerId) {
        res.status(400).json({ message: 'User ID is required' });
        return;
    }

    try {
        // Check if the project exists and the user is the owner
        const project = await Project.findOne({ where: { id: projectId, ownerId, } });
        if (!project) {
        res.status(404).json({ message: 'Project not found or you do not have permission to add tasks to this project' });
        return;
        }

        // Create the new task
        const newTask = await Task.create({
            projectId,
            name,
            description,
            status: 'To Do',
            assigneeId,
            dueDate
        });

        res.status(201).json({ 
            message: 'Task created successfully', 
            status: 201,
            data: {
                newTask,
                projectName: project.name 
            }
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get tasks by project ID
export const getTasksByProjectId = async (req: AuthenticatedRequest, res: Response) => {
    const { projectId } = req.params;
    const ownerId = req.user?.id;

    if (!ownerId) {
        res.status(400).json({ message: 'User ID is required' });
        return;
    }

    try {
        // Check if the project exists and the user is the owner
        const project = await Project.findOne({ where: { id: projectId, ownerId } });
        if (!project) {
            res.status(404).json({ message: 'Project not found or you do not have permission to view tasks for this project' });
            return;
        }

        // Get tasks for the project
        const tasks = await Task.findAll({ where: { projectId } });

        res.status(200).json({
            message: 'Tasks fetched successfully',
            status: 200,
            data: tasks
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get tasks by user ID
export const getTasksByUserId = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(400).json({ message: 'User ID is required' });
        return;
    }

    try {
        // Get tasks assigned to the user
        const tasks = await Task.findAll({ where: { assigneeId: userId } });

        res.status(200).json({
            message: 'Tasks fetched successfully',
            status: 200,
            data: tasks
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Edit a task by ID
export const editTask = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { name, description, assigneeId, status, dueDate } = req.body;
    const ownerId = req.user?.id;

    if (!ownerId) {
        res.status(400).json({ message: 'User ID is required' });
        return;
    }

    try {
        // Check if the task exists and the user is the owner of the project
        const task = await Task.findOne({
            where: { id },
            include: [{ model: Project, where: { ownerId } }]
        });

        if (!task) {
            res.status(404).json({ message: 'Task not found or you do not have permission to edit this task' });
            return;
        }

        // Update task details
        task.name = name || task.name;
        task.description = description || task.description;
        task.assigneeId = assigneeId || task.assigneeId;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;

        await task.save();

        res.status(200).json({
            message: 'Task updated successfully',
            status: 200,
            data: task
        });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};