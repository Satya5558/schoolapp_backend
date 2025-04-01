import { Request } from "express";
import { IUser } from "./IUser";

export interface PassportRequest extends Request {
  user?: IUser;
}
