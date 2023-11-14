const passport = require("passport");
const bcryptjs = require("bcryptjs");

// For Sign Up And Login Of User
const { Strategy: LocalStrategy } = require("passport-local");

const User = require("./src/models/Contractor.js");


const passportLocalSetup = () => {
  // Local Strategy Middleware
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // Find User In DataBase
          const user = await User.findOne({ email: email });
          // Check If User Exists

          if (!user) {

            return done(null, false, { message: "Contractor not found" });
          }
          // Check If Password Is Correct
          let result = await bcryptjs.compare(password, user.password);

          // If Password Is Wrong
          if (!result) {

            return done(null, false, { message: "Wrong Password" });
          }

          return done(null, user, { message: "Login Success" });
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  // Storing User In Session
  passport.serializeUser((user, done) => {
    // Stores User Id In The Session
    done(null, user.id);
  });

  // Getting User From Session And Storing In req.user
  passport.deserializeUser(async (id, done) => {
    try {

      const user = await User.findById(id);
      done(null, user);
    } catch (error) {

      done(error, false);
    }
  });
};


module.exports = { passportLocalSetup };
