import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/db';
import User from './User';  // Assuming you have a User model

interface CommentAttributes {
  id: string;
  task_id: string;
  user_id: string;
  content: string;
  parent_id?: string | null; // Tambahkan parent_id sebagai atribut opsional
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: string;
  public task_id!: string;
  public user_id!: string;
  public content!: string;
  public parent_id!: string | null; // Definisikan parent_id

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tasks',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.UUID,
      allowNull: true, // Parent ID bisa null
      references: {
        model: 'comments', // Referensi ke tabel comments sendiri
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'comments',
    timestamps: true,
    underscored: true,
  }
);

// Relasi hierarki komentar
Comment.hasMany(Comment, { foreignKey: 'parent_id', as: 'replies' });
Comment.belongsTo(Comment, { foreignKey: 'parent_id', as: 'parent' });

// Relasi dengan User
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'User' }); // Alias 'User'

export default Comment;
