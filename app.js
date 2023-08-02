// backend/app.js
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000; // Replace with your desired port

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use(cookieParser());

// Mock user data (Replace this with a database in a real-world scenario)
const users = [
  {
    id: 1,
    username: "Creator",
    passwordHash: bcrypt.hashSync("password1", 10),
    interests: "car go vroom",
    imageURL:
      "https://media.discordapp.net/attachments/1130532055818711053/1135579981527908393/tasteink_teenage_mutant_biker_sharks_from_mars_in_the_style_of__15899ab1-db0e-4d9b-b70e-13d0f5c76730.png?width=651&height=651",
  },
  {
    id: 2,
    username: "user2",
    passwordHash: bcrypt.hashSync("password2", 10),
    imageURL:
      "https://media.discordapp.net/attachments/1130532055818711053/1135044714618437642/darkestredd_teenage_mutant_biker_sharks_from_mars_in_the_style__3702c791-3844-4a90-887e-51fc3b952a61.png?width=651&height=651",
  },
];

// Registration route
app.post("/register", (req, res) => {
  console.log("Users array:", users);
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Check if the username is already taken
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "Username already taken." });
  }

  // Hash the password and create a new user object
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    passwordHash: hashedPassword,
  };
  users.push(newUser);

  return res.status(201).json({ user: newUser });
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Find the user based on the provided username
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Compare the provided password with the hashed password stored in the database
  const passwordMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Incorrect password." });
  }

  // Set a cookie to indicate successful login (You may customize the cookie options as needed)
  res.cookie("loggedIn", true, { httpOnly: true, maxAge: 86400000 }); // 1 day expiration

  return res.json({ user });
});

// Logout route
app.post("/logout", (req, res) => {
  // Clear the login cookie (optional: you may want to add additional logout logic)
  res.clearCookie("loggedIn");

  return res.status(200).json({ message: "Logged out successfully." });
});

app.put("/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { interests } = req.body; // Get the new interests from the request body

  // Find the user based on the provided userId
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found." });
  }

  // Update the user's interests
  users[userIndex].interests = interests;

  return res.json({ user: users[userIndex] });
});
// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
