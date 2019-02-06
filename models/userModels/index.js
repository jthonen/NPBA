const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true},
  userPassword: { type: String, required: true}, 
  userFirstName: { type: String, required: true },
  userLastName: {type: String, required: true},
  userDOB: {type: String, required: false},
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = {User};