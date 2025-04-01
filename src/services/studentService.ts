import Student from "../models/studentModel";
import { IStudent } from "../types/IStudent";

export const createStudent = async (schoolData: IStudent) => {
  const newStudent = await Student.create(schoolData);
  return newStudent;
};
