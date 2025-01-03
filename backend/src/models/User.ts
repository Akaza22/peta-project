import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db';

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;  // Tambahkan properti untuk createdAt
  public updatedAt!: Date;  // Tambahkan properti untuk updatedAt
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,  // Aktifkan timestamps agar Sequelize mengelola createdAt dan updatedAt
  }
);

export default User;
