import { MongoClient } from "mongodb";
// import bcrypt from "bcrypt";
// import express from "express";
import mongoose from "mongoose";
// const Users = express.Router();

// import User from "../Models/User.js";

import express from "express";
const Users = express.Router();
import User from "../Models/User.js";

// Mock user data (Replace this with a database in a real-world scenario)
// const users = [
//   {
//     id: 1,
//     username: "Creator",
//     passwordHash: bcrypt.hashSync("password1", 10),
//     interests: "car go vroom",
//     imageURL:
//       "https://media.discordapp.net/attachments/1130532055818711053/1135579981527908393/tasteink_teenage_mutant_biker_sharks_from_mars_in_the_style_of__15899ab1-db0e-4d9b-b70e-13d0f5c76730.png?width=651&height=651",
//   },
//   {
//     id: 2,
//     username: "user2",
//     passwordHash: bcrypt.hashSync("password2", 10),
//     imageURL:
//       "https://media.discordapp.net/attachments/1130532055818711053/1135044714618437642/darkestredd_teenage_mutant_biker_sharks_from_mars_in_the_style__3702c791-3844-4a90-887e-51fc3b952a61.png?width=651&height=651",
//   },
// ];

//updates
// users.put("/:userId", (req, res) => {
//   const userId = parseInt(req.params.userId, 10);
//   const { interests } = req.body; // Get the new interests from the request body

//   // Find the user based on the provided userId
//   const userIndex = users.findIndex((user) => user.id === userId);
//   if (userIndex === -1) {
//     return res.status(404).json({ message: "User not found." });
//   }

//   // Update the user's interests
//   users[userIndex].interests = interests;

//   return res.json({ user: users[userIndex] });
// });

//new users

// // Registration route
// users.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     console.log("Register!");

//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: "Username and password are required." });
//     }

//     // Check if the username is already taken
//     const user = User.find({ name: username });

//     if (user.length) {
//       return res.status(409).json({ message: "Username already taken." });
//     }

//     // Hash the password and create a new user object
//     const hashedPassword = bcrypt.hashSync(password, 10);
//     const newUser = await User.create({
//       name: username,
//       password: hashedPassword,
//     });

//     res.status(201).json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false });
//   }
// });

// const Users = () => {
// Users.post("/register", function (req, res) {
//   const { username, password } = req.body;
//   User.register(
//     new User({ username: username.username }),
//     password.password,
//     function (err, user) {
//       if (err) {
//         res.json({
//           success: false,
//           message: "Your account could not be saved. Error: " + err,
//         });
//       } else {
//         req.login(user, (er) => {
//           if (er) {
//             res.json({ success: false, message: er });
//           } else {
//             res.json({
//               success: true,
//               message: "Your account has been saved",
//             });
//           }
//         });
//       }
//     }
//   );
// });

// export default Users;

// Users.post("/register", function (req, res) {
//   const { username, password, email } = req.body;

//   console.log("Received registration request:", { username, password, email });

// User.register(
//   new User({ username: username, email: email }),
//   password,
//   function (err, user) {
//     if (err) {
//       console.error("Registration error:", err);
//       res.json({
//         success: false,
//         message: "Your account could not be saved. Error: " + err,
//       });
//     } else {
//       console.log("User registered successfully:", user);
//       req.login(user, (er) => {
//         if (er) {
//           console.error("Login error:", er);
//           res.json({ success: false, message: er });
//         } else {
//           console.log("User logged in:", user);
//           res.json({
//             success: true,
//             message: "Your account has been saved",
//           });
//         }
//       });
//     }
//   }
// );
// });
// Users.post("/register", function (req, res) {
//   const { email, password } = req.body; // Use "email" and "password"
//   User.register(
//     new User({ email: email }), // Use email as the username
//     password,
//     function (err, user) {
//       if (err) {
//         console.error("Registration error:", err);
//         res.json({
//           success: false,
//           message: "Your account could not be saved. Error: " + err,
//         });
//       } else {
//         console.log("User registered successfully:", user);
//         req.login(user, (er) => {
//           if (er) {
//             console.error("Login error:", er);
//             res.json({ success: false, message: er });
//           } else {
//             console.log("User logged in:", user);
//             res.json({
//               success: true,
//               message: "Your account has been saved",
//             });
//           }
//         });
//       }
//     }
//   );
// });

// export default Users;
Users.post("/register", function (req, res) {
  const { email, password, username } = req.body; // Use "email", "password", and "username"
  User.register(
    new User({ email: email, username: username }), // Use email and username
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
          user: user, // Include the user data
        });
      }
    }
  );
});
export default Users;
