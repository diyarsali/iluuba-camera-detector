const mongoose = require("mongoose");

//user schema

let userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
const User = (module.exports = mongoose.model("User", userSchema));
