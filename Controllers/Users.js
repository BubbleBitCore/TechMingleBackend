import { GlobalError } from "../middlewares/errorMiddleware.js";
import { sessionsModel } from "../models/Sessions.js";
import { usersModel } from "../models/Users.js";
import { hashPassword } from "../utils/hashPassword.js";
import { sendMail } from "../utils/mailer.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import jwt from "jsonwebtoken";

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

export const deleteSession = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      const error = new GlobalError("Provide sessionId", 500);
      return next(error);
    }
    const sessions = await sessionsModel.deleteOne({ _id: sessionId });
    res.status(200).json({ success: true, message: "Session removed!" });
  } catch (err) {
    const error = new GlobalError(err.message, 500);
    next(error);
  }
};

export const deleteAllSessions = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      const error = new GlobalError("Provide userId", 500);
      return next(error);
    }
    const sessionsObjects = await sessionsModel.find();
    const sessions = sessionsObjects.filter((item) => {
      const sessionObject = JSON.parse(item.session);
      if (sessionObject.userId == userId) {
        return sessionObject;
      }
    });
    sessions.map(async (item) => {
      await sessionsModel.deleteOne({ _id: item.id });
    });
    if (!req.gonext) {
      res.status(200).json({ success: true, message: "All Sessions removed!" });
    }
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

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await usersModel.findByIdAndDelete(userId);
    if (!user) {
      const error = new GlobalError("Can't find user", 404);
      return next(error);
    }
    req.session.destroy();
    res.status(200).json({ success: true, message: "Deleted User!" });
  } catch (err) {
    const error = new GlobalError(err.message, 500);
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await usersModel.findOne({ email }); // checking if user already exists or not
    if (!user) {
      const error = new GlobalError("User not found!", 404);
      return next(error);
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "300s" }
      // Token valid for 5 min only
    );
    const link = `${process.env.FRONTEND_URI}/resetpassword/${user._id}/${token}`;
    const subject = `Reset Password | ${user.name}'s Account `;
    const message = `Click the link below to reset your password (${new Date().toLocaleString()}) . Ensure you complete the reset process within the next 5 minutes for security reasons ,Link:  ${link}`;
    sendMail(
      process.env.FROM,
      process.env.PASS,
      user.email,
      subject,
      message,
      user.name
    );
    res.status(200).json({ success: true, message: "Check your email" });
  } catch (err) {
    const error = new GlobalError(err.message, 404);
    return next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { userId, password, token } = req.body;
    let user = await usersModel.findById(userId); // checking if user already exists or not
    if (!user) {
      const error = new GlobalError("User not found!", 404);
      return next(error);
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        const error = new GlobalError("Link Expired!", 500);
        return next(error);
      }
      let hashedPassword = hashPassword(password);
      user = await usersModel.findByIdAndUpdate(userId, {
        password: hashedPassword,
      });
      req.gonext = true;
      await deleteAllSessions(req, res, next); // destroying all sessions on password change
      res.status(200).json({
        success: true,
        message: "Password updated",
      });
    });
  } catch (err) {
    const error = new GlobalError(err.message, 404);
    return next(error);
  }
};
