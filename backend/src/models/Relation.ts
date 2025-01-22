import User from './User';
import Project from './Project';
import Task from './Task';
import Comment from './Comment';
import File from './File';
import Collaborator from './Collaborators';

// Definisikan relasi antar model

// Relasi User dan Project
User.hasMany(Project, { foreignKey: 'ownerId' });
Project.belongsTo(User, { foreignKey: 'ownerId' });

// Relasi Project dan Task
Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

// Relasi Task dan User (Assignee)
User.hasMany(Task, { foreignKey: 'assigneeId' });
Task.belongsTo(User, { foreignKey: 'assigneeId' });

// Relasi Task dan Comment
Task.hasMany(Comment, { foreignKey: 'taskId' });
Comment.belongsTo(Task, { foreignKey: 'taskId' });

// Relasi User dan Comment
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// Relasi Task dan File
Task.hasMany(File, { foreignKey: 'taskId' });
File.belongsTo(Task, { foreignKey: 'taskId' });

// Relasi User dan File
User.hasMany(File, { foreignKey: 'uploadedBy' });
File.belongsTo(User, { foreignKey: 'uploadedBy' });

// Relasi Project dan Collaborator
Project.hasMany(Collaborator, { foreignKey: 'projectId' });
Collaborator.belongsTo(Project, { foreignKey: 'projectId' });

// Relasi User dan Collaborator
User.hasMany(Collaborator, { foreignKey: 'userId' });
Collaborator.belongsTo(User, { foreignKey: 'userId' });

// Export semua model
export { User, Project, Task, Comment, File, Collaborator };
