import mongoose from "mongoose";
import * as constants from "../constants";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: constants.emailMinLength,
    maxlength: constants.emailMaxLength
  },
  password: {
    type: String,
    required: true,
    minlength: constants.passwordMinLength,
    maxlength: constants.passwordHashedMaxLength
  }
});

export const User = mongoose.model("User", userSchema);
