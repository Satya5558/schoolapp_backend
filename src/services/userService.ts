import bcrypt from "bcryptjs";
import User from "../models/user";
import { IUser } from "../types/IUser";
// exports.createUser = async (userData) => {
//   const userModel = User.build(userData);
//   userModel.setRole({});
//   return savedUser;
// };

export const createAdminUser = async (userData: IUser) => {
  //Getting Admin Role
  //const adminRole = await Role.findOne({ where: { name: "ROLE_ADMIN" } });
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const userDetails = {
    ...userData,
    password: hashedPassword,
  };
  //Creating User Model and assigning Admin role
  const userModel = await User.create(userDetails);

  return userModel;
};

export const checkUsername = async (userName) => {
  const user = await User.findOne({ where: { userName } });

  if (user) {
    throw new Error(`Username  already exists`);
  } else {
    return true;
  }
};

export const checkEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    throw new Error(`Email already exists`);
  } else {
    return true;
  }
};
