import passport from "passport";

//Strategies
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import School from "../models/schoolModel";

//Models
import User from "../models/userModel";

//Configuring Admin Local Strategy
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

//Configurin School Local Startegy
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

//Configuring Passport JWT Strategy
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
        const user = await User.findOne({ email: jwtPayload.email });

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

passport.use(
  "school-jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        //Finding School based on the email
        const school = await School.findOne({ email: jwtPayload.email });

        if (!school) {
          //If school not found returning error null with result false
          done(null, false);
        }
        //If school found returning error null with result school details
        done(null, school);
      } catch (error) {
        //If school not  found returning error  with result false
        done(error, false);
      }
    }
  )
);
