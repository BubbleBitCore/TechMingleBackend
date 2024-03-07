import { GlobalError } from "../middlewares/errorMiddleware.js";
import { usersModel } from "../models/Users.js";
import { hashPassword } from "../utils/hashPassword.js";
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

    res.status(200).json({
      success: true,
      message: `User Created !`,
    });
  } catch (err) {
    const error = new GlobalError(err.message, 500);
    next(error);
  }
};
