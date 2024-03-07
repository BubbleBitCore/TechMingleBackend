import { usersModel } from "../models/Users.js";
import { GlobalError } from "./errorMiddleware.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.session.isAuth || !req.session.userId) {
      const error = new GlobalError("Login first", 401);
      return next(error);
    }
    const user = await usersModel.findById(req.session.userId);
    if (!user) {
      const error = new GlobalError("Invalid ID", 500);
      return next(error);
    }
    next();
  } catch (err) {
    const error = new GlobalError(err.message, 500);
    next(error);
  }
};
