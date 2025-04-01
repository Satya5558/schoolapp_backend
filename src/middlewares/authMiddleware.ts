import { NextFunction, Response } from "express";
import passport from "passport";
import { PassportRequest } from "../types/PassportRequest";

/**
 * Common authentication handler
 */
const authenticateUser = (strategy: string, failureMessage: string) => {
  return (req: PassportRequest, res: Response, next: NextFunction) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          status: "failed",
          message: failureMessage,
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

// Local Authentication Strategies
export const localAuth = authenticateUser(
  "admin-login",
  "Username or password is wrong"
);

export const schoolAuth = authenticateUser(
  "school-login",
  "Username or password is wrong"
);

// JWT Authentication Strategies
export const jwtAuth = authenticateUser("admin-jwt", "Unauthorized request");

export const schoolJwtAuth = authenticateUser(
  "school-jwt",
  "Unauthorized request"
);
