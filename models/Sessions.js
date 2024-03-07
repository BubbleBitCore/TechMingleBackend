import mongoose from "mongoose";

// Define the schema for the session collection
const sessionsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },

  expires: {
    type: Date,
    reuired: true,
  },
  session: {
    type: String,
    required: true,
  },
});

// Create the model for the session collection
export const sessionsModel = mongoose.model("sessions", sessionsSchema);
