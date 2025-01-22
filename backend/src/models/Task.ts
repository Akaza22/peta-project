import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/db';

interface TaskAttributes {
  id: string;
  projectId: string; // Relasi ke Project
  name: string;
  description: string | null;
  status: 'To Do' | 'In Progress' | 'Done';
  assigneeId: string | null; // Relasi ke User
  dueDate: Date | null;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: string;
  public projectId!: string;
  public name!: string;
  public description!: string | null;
  public status!: 'To Do' | 'In Progress' | 'Done';
  public assigneeId!: string | null;
  public dueDate!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'projects', // Nama tabel Project
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
      allowNull: false,
      defaultValue: 'To Do',
    },
    assigneeId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users', // Nama tabel User
        key: 'id',
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
    underscored: true,
  }
);

export default Task;
