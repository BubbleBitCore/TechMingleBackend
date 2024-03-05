export class GlobalError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.type = this.constructor.name;
    this.errorMessage = message;
  }
}

export class RouteError extends GlobalError {
  constructor(message, statusCode, route) {
    super(message, statusCode);
    this.route = route;
  }
}


// Actual Error Middleware

export const HandleError = (error, req, res, next) => {
  if (!error) return next();
  res.status(error.statusCode).json({ success: false, error: error });
};
