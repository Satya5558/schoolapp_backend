const appRoot = require("app-root-path");
const passport = require("passport");

const bcrypt = require("bcryptjs");

//Strategies
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const School = require("../models/schoolModel");
//Models
const User = require(`${appRoot}/models/userModel`);

//Configuring Local Strategy
passport.use(
  "admin-login",
  new LocalStrategy(
    {
      usernameField: "email", // Specify that we use email instead of username
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        // Compare the provided password with the hashed one
        //const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = await user.checkPassword(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "school-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        //Find school by email
        const school = await School.findOne({ email });

        if (!school) {
          return done(null, false, { message: "School not found" });
        }
        //Comparing passwords
        const isMatched = await school.checkPassword(password, school.password);

        if (!isMatched) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, school);
      } catch (error) {
        return done(error);
      }
    }
  )
);

//Configuring  Passport Strategy
passport.use(
  "admin-jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        // Find the user based on the payload's ID
        const user = User.findOne({ email: jwtPayload.email });

        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
