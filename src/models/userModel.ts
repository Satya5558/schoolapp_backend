import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { IUser } from "../types/IUser";

const userSchema = new mongoose.Schema<IUser>({
  userName: { type: String, unique: true, require: true },
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, require: true },
  address: String,
  password: String,
  dateOfBirth: Date,
  roles: { type: [String], required: true },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
