import express from "express";
const auth = express.Router();

// Login route
auth.post("/login", (req, res) => {
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
auth.post("/logout", (req, res) => {
  // Clear the login cookie (optional: you may want to add additional logout logic)
  res.clearCookie("loggedIn");

  return res.status(200).json({ message: "Logged out successfully." });
});

export default auth;
