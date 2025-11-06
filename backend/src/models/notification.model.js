import mongoose from "mongoose";

const notifiacationSchema = mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required, enum: ["follow", "like", "comment"] },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", default: null },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notifiacationSchema);

export default Notification;