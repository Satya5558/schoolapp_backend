// Refactored School model for clarity and maintainability
import bcrypt from "bcryptjs";
import { DataTypes, Model, Optional } from "sequelize";
import { ISchool } from "../types/ISchool";
import sequelize from "./index";

type SchoolCreationAttributes = Optional<ISchool, "id">;

class School
  extends Model<ISchool, SchoolCreationAttributes>
  implements ISchool
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public postal_code!: string;
  public phone_number!: string;
  public website!: string;
  public logo_original_name!: string;
  public storage_logo_name!: string;
  public school_unique_id!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

School.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
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
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    website: DataTypes.STRING,
    logo_original_name: DataTypes.STRING,
    storage_logo_name: DataTypes.STRING,
    school_unique_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "School",
    tableName: "schools",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["email"] },
      { unique: true, fields: ["school_unique_id"] },
    ],
  }
);

export default School;
