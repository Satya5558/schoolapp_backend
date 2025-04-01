import { Types } from "mongoose";

export interface ISchool {
  _id?: Types.ObjectId;
  school_unique_id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone_number: string;
  website: string;
  logo_original_name: string;
  createdAt: Date;
  updatedAt: Date;
  storage_logo_name: string;
  address: string;
  getUniqueSchoolId(): Promise<string>;
  checkPassword(password: string, dbPassword: string): Promise<boolean>;
}
