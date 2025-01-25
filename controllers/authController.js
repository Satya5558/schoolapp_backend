const appRoot = require("app-root-path");
const catchAsync = require("../utils/catchAsync");

const { generateJWTToken } = require(`${appRoot}/services/jwtService`);

exports.login = catchAsync(async (req, res, next) => {
  const { userName, email, roles } = req?.user;

  //Generating token
  const token = generateJWTToken({ userName, email, roles });

  return res.status(200).send({
    status: "success",
    userDetails: { userName, email },
    roles,
    token,
  });
});

exports.schoolLogin = catchAsync(async (req, res, next) => {
  const { email, name } = req?.user;

  const roles = ["ROLE_SCHOOL_ADMIN"];

  const token = generateJWTToken({ email, roles });

  return res.status(200).json({
    status: "success",
    schoolDetails: { name, email },
    roles,
    token,
  });
});
