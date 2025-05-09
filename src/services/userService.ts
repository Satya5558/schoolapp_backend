import User from "../models/userModel";

// exports.createUser = async (userData) => {
//   const userModel = User.build(userData);
//   userModel.setRole({});
//   return savedUser;
// };

export const createAdminUser = async (userData) => {
  //Getting Admin Role
  //const adminRole = await Role.findOne({ where: { name: "ROLE_ADMIN" } });
  const userDetails = { ...userData, roles: ["ROLE_ADMIN"] };

  //Creating User Model and assigning Admin role
  const userModel = await User.create(userDetails);

  return userModel;
};

export const checkUsername = async (userName) => {
  const user = await User.findOne({ userName });

  if (user) {
    throw new Error(`Username  already exists`);
  } else {
    return true;
  }
};

export const checkEmail = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new Error(`Email already exists`);
  } else {
    return true;
  }
};
