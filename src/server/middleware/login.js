import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../model";

const invalidCredentialsMessage = "Invalid username or password";

passport.serializeUser((user, done) => {
  done(null, user._id); // eslint-disable-line no-underscore-dangle
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ _id: id });
    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Check user exists
      const user = await User.findOne({ username });
      if (!user)
        return done(null, false, { message: invalidCredentialsMessage });

      // Check provided password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword)
        return done(null, false, { message: invalidCredentialsMessage });

      return done(null, user);
    } catch (e) {
      return done(e);
    }
  })
);
