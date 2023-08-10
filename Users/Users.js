import express from "express";
const Users = express.Router();
import User from "../Models/User.js";

Users.post("/register", function (req, res) {
  const { email, password, username } = req.body;
  User.register(
    new User({ email: email, username: username }),
    password,
    function (err, user) {
      if (err) {
        console.error("Registration error:", err);
        res.json({
          success: false,
          message: "Your account could not be saved. Error: " + err,
        });
      } else {
        console.log("User registered successfully:", user);

        // Send user data back to the frontend
        res.json({
          success: true,
          message: "Your account has been saved",
          user: user,
        });
      }
    }
  );
});

// // Protect the route with authentication middleware if needed
// Users.post("/update-user", (req, res) => {
//   // Get user ID from the authenticated user object
//   const userId = req.user._id;

//   // Get updated information from the request body
//   const updatedImage = req.body.image;

//   // Find the user by ID and update the interests
//   User.findByIdAndUpdate(
//     userId,
//     { image: updatedImage },
//     { new: true },
//     (err, user) => {
//       if (err) {
//         return res
//           .status(500)
//           .json({ success: false, message: "Internal servers error" });
//       }
//       if (!user) {
//         return res
//           .status(404)
//           .json({ success: false, message: "User not found" });
//       }

//       return res.json({ success: true, user: user });
//     }
//   );
// });

export default Users;
