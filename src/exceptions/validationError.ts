import IValidationError from "../types/IValidationError";

class ValidationError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  errors: any;

  constructor(message: string, errorDetails: IValidationError) {
    super(message);

    this.statusCode = errorDetails?.statusCode;
    this.status = `${errorDetails?.statusCode}`.startsWith("4")
      ? "fail"
      : "error";
    this.isOperational = true;
    this.errors = errorDetails.errors;

    //Creating stack object on current object
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ValidationError;
