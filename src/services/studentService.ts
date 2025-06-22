import Student from "../models/student";

export const createStudent = async (schoolData) => {
  const newStudent = await Student.create(schoolData);
  return newStudent;
};
