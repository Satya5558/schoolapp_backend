import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import logger from "../config/winston";
import ValidationError from "../exceptions/validationError";
import School from "../models/school";
import Student from "../models/student";
import { createStudent } from "../services/studentService";
import { PassportRequest } from "../types/PassportRequest";
import catchAsync from "../utils/catchAsync";
import formatErrors from "../utils/validatorUtil";

//This middleware create Student
export const createStudentAction = catchAsync(
  async (req: PassportRequest, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new ValidationError("validationErrors", {
        statusCode: 400,
        message: "Validation error",
        errors: formatErrors(result.array()),
      });
    }

    const authenticatedDetails = req.user;
    const schoolDetails = await School.findByPk(authenticatedDetails.id);

    const studentDetails = { ...req.body };

    studentDetails.school_id = schoolDetails.id;

    const savedStudentDetails = await createStudent(studentDetails);

    logger.info(`Student created successfully`);

    return res.status(201).json({
      status: "success",
      data: { studentData: savedStudentDetails },
    });
  }
);

export const getStudentsAction = catchAsync(
  async (req: PassportRequest, res: Response, next: NextFunction) => {
    const students = await Student.findAll({
      where: { school_id: req.user?.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return res.status(200).json({
      message: "Success",
      students: students,
    });
  }
);
