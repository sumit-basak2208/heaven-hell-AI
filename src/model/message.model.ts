import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: String,
    isBot: Boolean,
    isHeaven: Boolean,
    email: String,
  },
  { timestamps: true }
);

const Message =
  mongoose.models.messages || mongoose.model("messages", messageSchema);

export default Message;
