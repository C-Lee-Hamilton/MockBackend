import mongoose from "mongoose";
const Schema = mongoose.Schema;

import passportLocalMongoose from "passport-local-mongoose";

// const UserSchema = new Schema({
//   name: { type: String, required: true, maxLength: 100 },
//   password: { type: String, required: true, maxLength: 100 },
//   interest: { type: String, required: false, maxLength: 100 },
// });

// // plugin for passport-local-mongoose
// UserSchema.plugin(passportLocalMongoose);

// export default mongoose.models.User || mongoose.model("User", UserSchema);

// importing modules

var UserSchema = new Schema({
  email: { type: String, required: false, unique: true },
  name: { type: String, unique: true, required: true },
});

// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);

// export userschema
// module.exports = mongoose.model("User", UserSchema);
export default mongoose.models.User || mongoose.model("User", UserSchema);
