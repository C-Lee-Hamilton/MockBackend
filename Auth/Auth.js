import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
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

// Protect the route with authentication middleware
// router.post(
//   "/change-password",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     // Get the current user ID from the authenticated user object
//     const userId = req.user._id;

//     // Get old and new passwords from the request body
//     const oldPassword = req.body.oldPassword;
//     const newPassword = req.body.newPassword;

//     // Find the user by ID and use the changePassword method
//     User.findById(userId, (err, user) => {
//       if (err) {
//         return res
//           .status(500)
//           .json({ success: false, message: "Internal server error" });
//       }
//       if (!user) {
//         return res
//           .status(404)
//           .json({ success: false, message: "User not found" });
//       }

//       // Use the changePassword method to update the password
//       user.changePassword(oldPassword, newPassword, (err) => {
//         if (err) {
//           return res
//             .status(400)
//             .json({ success: false, message: "Password change failed" });
//         }
//         return res.json({
//           success: true,
//           message: "Password changed successfully",
//         });
//       });
//     });
//   }
// );

//Update User Picture
// Protect the route with authentication middleware if needed
// router.post("/update-user", passport.authenticate("jwt"), (req, res) => {
//   console.log("Received headers:", req.headers); // Log received headers
//   console.log("this is here");

//   // Get user ID from the authenticated user object
//   const userId = req.user._id;

// Get updated information from the request body
// const updatedImage = req.body.imageurl;

// User.findById(
//   userId,

//   { image: updatedImage },
//   { new: true },
//   (err, user) => {
//     if (err) {
//       console.error(err); // Log the error for debugging
//       return res
//         .status(500)
//         .json({ success: false, message: "Internal server error" });
//     }
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     console.log("User updated:", user); // Log the updated user
//     return res.json({ success: true, user: user });
//   }
// );

// });

router.post("/update-user", passport.authenticate("jwt"), async (req, res) => {
  try {
    // Get user ID from the authenticated user object
    const userId = req.user._id;

    // Get updated information from the request body
    const updatedImage = req.body.imageurl;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.image = updatedImage; // Update the user's image
    await user.save();

    console.log("User updated:", user);
    return res.json({ success: true, user: user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export default router;
