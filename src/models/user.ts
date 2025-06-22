import bcrypt from "bcryptjs";
import { DataTypes, Model } from "sequelize";
import { IUser } from "../types/IUser";
import sequelize from "./index"; // Adjust the import path as necessary

class User extends Model<IUser> implements IUser {
  id?: number; // Optional, if you want to use auto-incrementing IDs
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  password: string;

  comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users", // Specify the table name if different
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default User;
