import express from "express";
import { configDotenv } from "dotenv"; // for handling Environment variables
import path from "path";
import cors from "cors"; // for handling cors
import { HandleError, RouteError } from "./Middlewares/errorMiddleware.js"; // for handling errors
import cookieParser from "cookie-parser"; // for handling cookies
import session from "express-session"; // for handling sessions
import requestIp from "request-ip";
import useragent from "express-useragent";
import { logRequestDetails } from "./Middlewares/commonWare.js";

// Importing all Routes Here
import authRouter from "./Routes/auth.js";

// Express app initilisation
export const app = express();

//Middlewares
app.use(express.json()); // for parsing json data from body
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing html form data
app.use(express.static(path.join(path.resolve(), "public")));
app.set("view engine", "ejs");
app.use(useragent.express()); // Middleware to parse User-Agent header
app.use(requestIp.mw()); // Middleware for getting IP addresses
app.use(logRequestDetails); // Middleware to log request information

//environment variables
configDotenv({
  path: "./data/config.env",
});

//CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URI,
      process.env.DASHBOARD_URI,
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    method: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

// Routes // v1 designation for v1 api
app.use("/v1/auth", authRouter);

//Default route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All Systems Normal" });
});

app.all("*", (req, res, next) => {
  const error = new RouteError("No such route", 404, req.url);
  next(error);
});

// Global Error Middleware
app.use(HandleError);
