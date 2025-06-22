import { Gender, Status } from "./Enums";
export interface IStudent {
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: Date;
  email: string;
  phoneNumber: string;
  enrollmentDate: Date;
  enrollmentStatus: Status;
  school: number;
}
