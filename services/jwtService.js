const jwt = require("jsonwebtoken");

exports.generateJWTToken = (payload) => {
  const { JWT_SECRET, JWT_SECRET_EXPIRY } = process.env;
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_SECRET_EXPIRY });
};

exports.validateToken = (token) => {};
