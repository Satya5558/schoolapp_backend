import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import logger from "../config/winston";
import School from "../models/schoolModel";
import Student from "../models/studentModel";
import { createStudent } from "../services/studentService";
import { PassportRequest } from "../types/PassportRequest";
import catchAsync from "../utils/catchAsync";
import ValidationError from "../utils/validationError";
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
    const schoolDetails = await School.findById(authenticatedDetails._id);

    const studentDetails = { ...req.body };

    studentDetails.school = schoolDetails.id;

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
    const students = await Student.find({ school: req.user?._id })
      .select("-createdAt -updatedAt -__v")
      .exec();

    res.status(200).send({
      message: "Success",
      students: students,
    });
  }
);
