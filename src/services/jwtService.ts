import jwt from "jsonwebtoken";

export const generateJWTToken = (payload) => {
  const { JWT_SECRET, JWT_SECRET_EXPIRY } = process.env;

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_SECRET_EXPIRY as unknown as number,
  });
};

export const validateToken = (token) => {};
