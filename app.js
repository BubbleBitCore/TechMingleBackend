import express from "express";
import { configDotenv } from "dotenv";
import path from "path";
import cors from "cors";// for cors handling
import cookieParser from "cookie-parser";// for cookies

// Importing all Routes Here


// Express app initilisation
export const app = express();

//Middlewares
app.use(express.json()); // for parsing json data from body
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing html form data
app.use(express.static(path.join(path.resolve(), "public")));
app.set("view engine", "ejs");
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


// Routes 


//Default route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All Systems Normal" });
});