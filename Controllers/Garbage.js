import { usersModel } from "../models/Users.js";
import { otpModel } from "../models/OTP.js";
import { GlobalError } from "../middlewares/errorMiddleware.js";

export const removeGarbage = async (req, res, next) => {
  try {
    // clears all garbage un-used 
    // Garbage data will be stored only for 2 days , after this period it gets deleted
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 2);
    await usersModel.deleteMany({
      createdAt: { $lt: currentDate },
      verified: false,
    });
    await otpModel.deleteMany({ createdAt: { $lt: currentDate } });
    res.status(200).json({ success: true, message: "Garbage Removed!" });
  } catch (err) {
    const error = new GlobalError(err.message, 500);
    next(error);
  }
};
