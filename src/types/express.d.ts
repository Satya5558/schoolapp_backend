import { IUser } from "./IUser";

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
      file?: Express.Multer.File;
    }
  }
}
