import mongoose from "mongoose";

const userRelationshipsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  followedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const userRelationshipsModel = mongoose.model(
  "userRelationships",
  userRelationshipsSchema
);
