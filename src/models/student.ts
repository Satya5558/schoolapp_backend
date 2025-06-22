import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

interface StudentAttributes {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  email: string;
  phoneNumber: string;
  enrollementDate: Date;
  enrollementStatus: number;
  school_id: number;
}

class Student extends Model<StudentAttributes> implements StudentAttributes {
  firstName!: string;
  lastName!: string;
  gender!: string;
  dateOfBirth!: Date;
  email!: string;
  phoneNumber!: string;
  enrollementDate!: Date;
  enrollementStatus!: number;
  school_id!: number;
}

Student.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    enrollementDate: DataTypes.DATE,
    enrollementStatus: DataTypes.INTEGER,
    school_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Student",
    tableName: "students", // Specify the table name if different
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    indexes: [
      {
        unique: true,
        fields: ["email"], // Ensure email is unique
      },
      {
        unique: false,
        fields: ["school_id"], // Index for school_id to optimize queries
      },
    ],
  }
);

export default Student;
