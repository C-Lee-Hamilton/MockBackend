// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// import passportLocalMongoose from "passport-local-mongoose";

// var UserSchema = new Schema({
//   email: { type: String, unique: true, required: true }, // Use email as the unique identifier
//   interests: { type: String, required: false },
// });
// UserSchema.plugin(passportLocalMongoose);

// export default mongoose.models.User || mongoose.model("User", UserSchema);
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: false },
  // interests: { type: String, required: false },
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.models.User || mongoose.model("User", UserSchema);
