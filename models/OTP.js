import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: [true, "Please provide OTP"],
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const otpModel = mongoose.model("otps", otpSchema);
