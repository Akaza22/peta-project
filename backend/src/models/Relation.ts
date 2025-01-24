import User from './User';
import Project from './Project';
import Task from './Task';
import Comment from './Comment';
import File from './File';
import Collaborator from './Collaborators';

// Definisikan relasi antar model

// Relasi User dan Project
User.hasMany(Project, { foreignKey: { name: 'owner_id', field: 'owner_id' } });
Project.belongsTo(User, { foreignKey: { name: 'owner_id', field: 'owner_id' } });

// Relasi Project dan Task
Project.hasMany(Task, { foreignKey: { name: 'project_id', field: 'project_id' } });
Task.belongsTo(Project, { foreignKey: { name: 'project_id', field: 'project_id' } });

// Relasi Task dan User (Assignee)
User.hasMany(Task, { foreignKey: { name: 'assignee_id', field: 'assignee_id' } });
Task.belongsTo(User, { foreignKey: { name: 'assignee_id', field: 'assignee_id' } });

// Relasi Task dan Comment
Task.hasMany(Comment, { foreignKey: { name: 'task_id', field: 'task_id' } });
Comment.belongsTo(Task, { foreignKey: { name: 'task_id', field: 'task_id' } });

// Relasi User dan Comment
User.hasMany(Comment, { foreignKey: { name: 'user_id', field: 'user_id' } });
Comment.belongsTo(User, { foreignKey: { name: 'user_id', field: 'user_id' } });

// Relasi Task dan File
Task.hasMany(File, { foreignKey: { name: 'task_id', field: 'task_id' } });
File.belongsTo(Task, { foreignKey: { name: 'task_id', field: 'task_id' } });

// Relasi User dan File
User.hasMany(File, { foreignKey: { name: 'uploaded_by', field: 'uploaded_by' } });
File.belongsTo(User, { foreignKey: { name: 'uploaded_by', field: 'uploaded_by' } });

// Relasi Project dan Collaborator
Project.hasMany(Collaborator, { foreignKey: { name: 'project_id', field: 'project_id' } });
Collaborator.belongsTo(Project, { foreignKey: { name: 'project_id', field: 'project_id' } });

// Relasi User dan Collaborator
User.hasMany(Collaborator, { foreignKey: { name: 'user_id', field: 'user_id' } });
Collaborator.belongsTo(User, { foreignKey: { name: 'user_id', field: 'user_id' } });

// Export semua model
export { User, Project, Task, Comment, File, Collaborator };
