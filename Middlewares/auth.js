import { GlobalError } from "./errorMiddleware.js";

export const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.sid) {
    const error = new GlobalError("Login to use", 401);
    next(error);
  }
  next();
};
