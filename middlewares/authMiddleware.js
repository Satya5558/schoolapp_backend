const passport = require("passport");

//Local Auth strategy
const localAuth = function (req, res, next) {
  passport.authenticate(
    "admin-login",
    function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          status: "failed",
          message: "Username or password is wrong",
        });
      }

      req.user = user;
      next();
    },
    {
      session: false,
    }
  )(req, res, next);
};

//School Auth
const schoolAuth = passport.authenticate("school-login", { session: false });

//Middleware for JWT strategy
const jwtAuth = passport.authenticate("admin-jwt", { session: false });

module.exports = {
  localAuth,
  jwtAuth,
  schoolAuth,
};
