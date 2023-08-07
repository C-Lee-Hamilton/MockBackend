import express from "express";
const router = express.Router();
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import User from "../Models/User.js";
import passport from "passport";
// const mongoose = require("mongoose");

// // Login route
// auth.post("/login", (req, res) => {
//   try {
//     const { username, password } = req.body;
//     console.log("Register!");

//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: "Username and password are required." });
//     }

//     // Find the user based on the provided username
//     const user = User.find({ name: username });
//     // const user = User.find({ userId: req.params.userId });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }
//     console.log("User");
//     console.log(user);
//     console.log(password);
//     // Compare the provided password with the hashed password stored in the database
//     const passwordMatch = bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Incorrect password." });
//     }

//     // Set a cookie to indicate successful login (You may customize the cookie options as needed)
//     res.cookie("loggedIn", true, { httpOnly: true, maxAge: 86400000 }); // 1 day expiration

//     return res.json({ user });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false });
//   }
// });

router.post("/login", function (req, res) {
  if (!req.body.username) {
    res.json({ success: false, message: "Username was not given" });
  } else if (!req.body.password) {
    res.json({ success: false, message: "Password was not given" });
  } else {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!user) {
          res.json({
            success: false,
            message: "username or password incorrect",
          });
        } else {
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            secretkey,
            { expiresIn: "24h" }
          );
          res.json({
            success: true,
            message: "Authentication successful",
            token: token,
          });
        }
      }
    })(req, res);
  }
});

// Logout route
router.post("/logout", (req, res) => {
  // Clear the login cookie (optional: you may want to add additional logout logic)
  res.clearCookie("loggedIn");

  return res.status(200).json({ message: "Logged out successfully." });
});

export default router;
