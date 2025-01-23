import express from 'express';
import { 
    createProject, 
    deleteProject, 
    editProject, 
    getUserProjects 
} from '../controllers/ProjectController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Route to create a new project
router.post('/create', authMiddleware(['user', 'admin']), createProject);
// route to get all projects by user
router.get('/my', authMiddleware(['user', 'admin']), getUserProjects);
// Route to edit a project
router.put('/:id', authMiddleware(['user', 'admin']), editProject);
// Route to delete a project
router.delete('/:id', authMiddleware(['user', 'admin']), deleteProject);

export default router;