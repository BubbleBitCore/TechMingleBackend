import otpGenerator from "otp-generator";
import { otpModel } from "../models/OTP.js";

export const generateOTP = async (email) => {
  try {
    if (!email) {
      const error = new GlobalError("Provide Email!", 500);
      next(error);
    }
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: true,
      specialChars: false,
    });
    await otpModel.deleteOne({ email }); // deleting previous otp for same email
    const otp_generated = await otpModel.create({ email, otp });
    return otp_generated.otp;
  } catch (err) {
    const error = new GlobalError(err.message, 500);
    next(error);
  }
};
