// import "dotenv/config";
// import express from "express";
// import bodyParser from "body-parser";
// import bcrypt from "bcrypt";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import Users from "./Users/Users.js";
// import auth from "./Auth/Auth.js";
// import mongoose from "mongoose";
// import passport from "passport";
// import User from "./Models/User.js";
// // import LocalStrateg from "passport-local";
// // const LocalStrategy = require("passport-local").Strategy;
// // passport.use(new LocalStrategy(User.authenticate()));

// mongoose.set("strictQuery", false);
// const mongoDB = process.env.MONGODB_URL;

// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
// }

// const app = express();
// const port = 5000; // Replace with your desired port

// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS for all routes
// app.use(cookieParser());

// app.use("/Users", Users);
// app.use("/Auth", auth);

// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// // Start the server
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

// export default app;

import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import Users from "./Users/Users.js";
import auth from "./Auth/Auth.js";
import mongoose from "mongoose";
import passport from "passport";
import User from "./Models/User.js";

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// main().catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const port = 5000; // Replace with your desired port

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
