import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/db';

// Definisi atribut User sesuai dengan database
interface UserAttributes {
  id: string; // UUID digunakan sebagai primary key
  name: string;
  email: string;
  password: string;
  role: string;
}

// Atribut opsional saat membuat user baru
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Kelas User Model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string; // UUID
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;

  public readonly createdAt!: Date; // Otomatis diisi Sequelize
  public readonly updatedAt!: Date; // Otomatis diisi Sequelize
}

// Inisialisasi model User
User.init(
  {
    id: {
      type: DataTypes.UUID, // UUID sebagai primary key
      defaultValue: DataTypes.UUIDV4, // Otomatis generate UUID
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user', // Role default adalah user
      validate: {
        isIn: [['admin', 'user']], // Validasi nilai role
      },
    },
  },
  {
    sequelize,
    tableName: 'users', // Nama tabel di database
    timestamps: true, // Sequelize akan mengelola createdAt dan updatedAt
    underscored: true, // Gunakan snake_case untuk nama kolom (created_at, updated_at)
  }
);

export default User;
