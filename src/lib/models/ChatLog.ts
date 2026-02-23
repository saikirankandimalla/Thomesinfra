import mongoose from "mongoose";

const ChatLogSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  messages: [
    {
      role: { type: String, required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  userIp: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ChatLogSchema.pre("save", function (this: any, next: any) {
  this.updatedAt = new Date();
  next();
} as any);

export default mongoose.models.ChatLog || mongoose.model("ChatLog", ChatLogSchema);
