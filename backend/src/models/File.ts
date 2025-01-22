import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/db';

interface FileAttributes {
  id: string;
  taskId: string; // Relasi ke Task
  fileUrl: string;
  uploadedBy: string; // Relasi ke User
}

interface FileCreationAttributes extends Optional<FileAttributes, 'id'> {}

class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
  public id!: string;
  public taskId!: string;
  public fileUrl!: string;
  public uploadedBy!: string;

  public readonly createdAt!: Date;
}

File.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tasks',
        key: 'id',
      },
    },
    fileUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    uploadedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'files',
    timestamps: true,
    underscored: true,
  }
);

export default File;
