import ValidationError from "../exceptions/validationError";

const sendErrorDev = (err, req, res) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
      error: err,
      stack: err.stack,
      data: {},
    });
  } else {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
      data: {},
    });
  }
};

const sendErrorProd = (err, req, res) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        errors: err.errors,
        data: {},
      });
    } else {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        data: {},
      });
    }
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error("ERROR 💥", err);
  // 2) Send generic message
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

export default function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  //console.log(process.env.NODE_ENV);

  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    sendErrorDev(err, req, res);
  } else {
    //let error = { ...err };

    /**Create custom error  */
    //if (error.name === "CastError") error = handleCastErrorDB(error);

    sendErrorProd(err, req, res);
  }
}
