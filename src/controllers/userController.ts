import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import logger from "../config/winston";
import ValidationError from "../exceptions/validationError";
import { createAdminUser } from "../services/userService";
import catchAsync from "../utils/catchAsync";
import formatErrors from "../utils/validatorUtil";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //Validating Request
    const result = validationResult(req);

    if (result.isEmpty()) {
      const userData = await createAdminUser({ ...req.body });

      logger.debug(`User created with ID: ${userData.id}`);

      return res.status(201).send({
        status: "success",
        message: "User created successfully",
        data: { user: userData },
      });
    } else {
      throw new ValidationError("validationErrors", {
        statusCode: 400,
        message: "Validation error",
        errors: formatErrors(result.array()),
        isOperational: true,
      });
    }
  }
);
