import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/db';

interface CollaboratorAttributes {
  id: string;
  projectId: string; // Relasi ke Project
  userId: string; // Relasi ke User
  projectRole: 'owner' | 'editor' | 'viewer' | 'collaborator';
  addedAt: Date;
}

interface CollaboratorCreationAttributes extends Optional<CollaboratorAttributes, 'id' | 'projectRole' | 'addedAt'> {}

class Collaborator extends Model<CollaboratorAttributes, CollaboratorCreationAttributes> implements CollaboratorAttributes {
  public id!: string;
  public projectId!: string;
  public userId!: string;
  public projectRole!: 'owner' | 'editor' | 'viewer' | 'collaborator';
  public addedAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Collaborator.init(
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
        model: 'projects',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    projectRole: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'collaborator',
      validate: {
        isIn: [['owner', 'editor', 'viewer', 'collaborator']],
      },
    },
    addedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'project_collaborators',
    timestamps: true,
    underscored: true,
  }
);

export default Collaborator;
