import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";
import users from "./Users/Users.js";
import auth from "./Auth/Auth.js";
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express();
const port = 5000; // Replace with your desired port

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use(cookieParser());

app.use("/users", users);
app.use("/auth", auth);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
