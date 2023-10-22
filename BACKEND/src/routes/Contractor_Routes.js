// import express from "express";
// import passport from "passport";
const express = require('express');
const passport = require('passport');



// import {
//   registration,
// } from "../controllers/Contractor.js";
const { registration } = require("../controllers/Contractor.js");


const Router = express.Router();

// Add User Function
Router.post("/register", registration);

// Login Apis
Router.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    console.log("Login Success");
    if (req.isAuthenticated()) {
      res.status(200).json({ message: "Login Success", user: req.user });
    } else {
      console.log("User not authenticated");
      res.status(401).json({ message: "User not authenticated" });
    }
  }
);

Router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      // handle error
      console.error(err);
      return res
        .status(500)
        .json({ message: "An error occurred during logout" });
    }
    // logout success
    res.status(200).json({ message: "User Logout Successful" });
  });
});



// export default Router;

module.exports = Router;

