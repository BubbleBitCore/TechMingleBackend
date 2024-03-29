// OpenDatabase Connection and running the server sequentially

import mongoose from "mongoose";
import { app } from "../app.js";

const Boot = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("TechMingle DB Online");
      app.listen(process.env.PORT, () => {
        console.log(`Server Running On PORT ${process.env.PORT}`);
      });
    })
    .catch((e) => {
      console.log("Error:", "DB Error");
    });
};

export default Boot;