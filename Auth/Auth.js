import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
// import secretKey from "dotenv/config";
const secretKey = process.env.SECRET_KEY;

const router = express.Router();
//login
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
            secretKey,
            { expiresIn: "24h" }
          );
          res.json({
            success: true,
            message: "successful",
            token: token,
            user: user,
          });
        }
      }
    })(req, res);
  }
});

router.post("/logout", (req, res, next) => {
  // Clear the login cookie (optional: you may want to add additional logout logic)
  res.clearCookie("loggedIn");
  return res.status(200).json({ message: "Logged out successfully." });
});

//PasswordChange
router.post(
  "/change-password",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    if (!user.validPassword(oldPassword)) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    user.setPassword(newPassword, function (err) {
      if (err) {
        return res.status(500).json({ message: "Error changing password" });
      }
      user.save(function (err) {
        if (err) {
          return res.status(500).json({ message: "Error saving user" });
        }
        res.json({ message: "Password changed successfully" });
      });
    });
  }
);

export default router;
