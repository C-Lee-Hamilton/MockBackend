import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  interest: { type: String, required: false, maxLength: 100 },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
