import { Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  password: string;
  dateOfBirth?: Date;
  roles: [string];
  checkPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}
