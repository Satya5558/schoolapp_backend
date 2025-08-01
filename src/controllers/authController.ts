import { generateJWTToken } from "../services/jwtService";
import catchAsync from "../utils/catchAsync";

export const login = catchAsync(async (req, res, next) => {
  const { userName, email } = req?.user;

  const roles = ["ROLE_ADMIN"];
  //Generating token
  const token = generateJWTToken({ userName, email, roles });

  return res.status(200).send({
    status: "success",
    userDetails: { userName, email },
    roles,
    token,
  });
});

export const schoolLogin = catchAsync(async (req, res, next) => {
  const { email, name, school_unique_id: school_id } = req?.user;

  const roles = ["ROLE_SCHOOL_ADMIN"];

  const token = generateJWTToken({ email, roles, school_id });

  return res.status(200).json({
    status: "success",
    schoolDetails: { name, email, school_id },
    roles,
    token,
  });
});
