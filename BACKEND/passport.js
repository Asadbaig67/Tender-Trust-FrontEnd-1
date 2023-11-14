// import passport from "passport";
// import bcryptjs from "bcryptjs";

// // For Sign Up And Login Of User
// import { Strategy as LocalStrategy } from "passport-local";

// import Contractor from "./src/models/Contractor.js";
const passport = require("passport");
const bcryptjs = require("bcryptjs");

// For Sign Up And Login Of User
const { Strategy: LocalStrategy } = require("passport-local");

const Contractor = require("./src/models/Contractor.js");


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
                    const contractor = await Contractor.findOne({ email: email });
                    // Check If User Exists

                    if (!contractor) {

                        return done(null, false, { message: "Contractor not found" });
                    }
                    // Check If Password Is Correct
                    let result = await bcryptjs.compare(password, contractor.password);

                    // If Password Is Wrong
                    if (!result) {

                        return done(null, false, { message: "Wrong Password" });
                    }

                    return done(null, contractor, { message: "Login Success" });
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );

    // Storing User In Session
    passport.serializeUser((contractor, done) => {
        // Stores User Id In The Session
        done(null, contractor.id);
    });

    // Getting User From Session And Storing In req.user
    passport.deserializeUser(async (id, done) => {
        try {

            const contractor = await Contractor.findById(id);
            done(null, contractor);
        } catch (error) {

            done(error, false);
        }
    });
};


module.exports = { passportLocalSetup };
