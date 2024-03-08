import { GlobalError } from "../middlewares/errorMiddleware.js";
import { otpModel } from "../models/OTP.js";
import { usersModel } from "../models/Users.js";
import { hashPassword } from "../utils/hashPassword.js";
import { sendMail } from "../utils/mailer.js";
import { generateOTP } from "../utils/otpGenerator.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new GlobalError("Validation error", 500);
      return next(error);
    }
    const hashedPass = hashPassword(password);
    let user = await usersModel.findOne({ email }).select("+password");
    if (!user) {
      const error = new GlobalError("Invalid email or password!", 500);
      return next(error);
    }
    if (!user.verified) {
      const error = new GlobalError("Verify your email!", 500);
      return next(error);
    }
    const isMatch = user.password === hashedPass;
    if (!isMatch) {
      const error = new GlobalError("Invalid email or password!", 500);
      return next(error);
    }
    req.session.isAuth = true;
    req.session.userId = user._id;
    req.session.location = req.DEVICE_LOCATION;
    req.session.device = req.DEVICE;
    req.session.ip_address = req.IP_ADDRESS;
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: sanitizeUser(user),
    });
  } catch (err) {
    const error = new GlobalError(err.message, 500);
    next(error);
  }
};
export const logout = async (req, res, next) => {
  req.session.destroy();
  res.status(200).json({ success: true, message: "Logged out!" });
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, mobileNo } = req.body;
    if (!name || !email || !password || !mobileNo) {
      const error = new GlobalError("Validation error", 500);
      return next(error);
    }
    let user = await usersModel.findOne({ email }); // checking if user already exists or not
    if (user) {
      const error = new GlobalError("User already exists!", 500);
      return next(error);
    }

    user = await usersModel.create({
      name,
      email,
      mobileNo,
      password: hashPassword(password),
    });
    const otp = await generateOTP(user.email);
    const subject = `Registration Successfull | ${user.name}`;
    const message = `Thank you for choosing us ${user.name}, otp is ${otp}`;
    sendMail(
      process.env.FROM,
      process.env.PASS,
      user.email,
      subject,
      message,
      user.name
    );
    res.status(200).json({
      success: true,
      message: `User Created !`,
    });
  } catch (err) {
    const error = new GlobalError(err.message, 500);
    next(error);
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      const error = new GlobalError("Validation error", 500);
      return next(error);
    }
    let user = await usersModel.findOne({ email }); // checking if user already exists or not
    if (!user) {
      const error = new GlobalError("User doesn't exists!", 404);
      return next(error);
    }
    let otpObject = await otpModel.findOne({ email });
    const now = Date.now();
    const otpExpiry = new Date(otpObject.createdAt).getTime() + 1 * 60 * 1000; // Expiry time is 5 minutes after createdAt
    if (now > otpExpiry) {
      // console.log("OTP expired");
      const error = new GlobalError("OTP Expired!", 500);
      return next(error);
    }

    user = await usersModel.findByIdAndUpdate(
      user._id,
      { verified: true },
      {
        new: true,
      }
    );

    await otpModel.deleteOne({ email }); // deleting previous otp for same email once verified

    res.status(200).json({
      success: true,
      message: `User verified!`,
    });
  } catch (err) {
    const error = new GlobalError(err.message, 500);
    next(error);
  }
};
