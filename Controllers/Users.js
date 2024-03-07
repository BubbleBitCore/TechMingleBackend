import { GlobalError } from "../middlewares/errorMiddleware.js";
import { sessionsModel } from "../models/Sessions.js";
import { usersModel } from "../models/Users.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";

export const getAllSessions = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const sessionsObjects = await sessionsModel.find();
    const sessions = sessionsObjects.filter(
      (item) => item.session.userId == userId
    );
    res.status(200).json({ success: true, sessions });
  } catch (err) {
    const error = new GlobalError(err.message, 500);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await usersModel.findById(req.session.userId);
    if (!user) {
      const error = new GlobalError("Login first", 401);
      return next(error);
    }
    res.status(200).json({ success: true, user: sanitizeUser(user) });
  } catch (err) {
    const error = new GlobalError(err.message, 500);
    next(error);
  }
};
