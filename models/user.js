import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  image: { type: String, required: true },
  dob: { type: Date },
  bio: String,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

export default User;