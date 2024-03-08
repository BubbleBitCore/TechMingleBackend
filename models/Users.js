import mongoose from "mongoose";
import { ROLE_USER } from "../data/Constants.js";

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter valid name"],
  },
  mobileNo: {
    type: Number,
    required: [true, "Please enter valid mobileNo"],
    match: [
      /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      "Please enter valid mobileNo",
    ],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please Enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Enter valid password"],
    minlength: 8,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: ROLE_USER, // role can be either user(nornal user) or admin
  },
});

export const usersModel = mongoose.model("users", usersSchema);
