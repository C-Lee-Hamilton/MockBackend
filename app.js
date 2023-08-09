import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import Users from "./Users/Users.js";
import auth from "./Auth/Auth.js";
import mongoose from "mongoose";
import passport from "passport";
import User from "./Models/User.js";
import LocalStrategy1 from "passport-local";
const LocalStrategy = LocalStrategy1.Strategy;
passport.use(new LocalStrategy(User.authenticate()));

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use(cookieParser());

app.use("/Users", Users);
app.use("/Auth", auth);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
