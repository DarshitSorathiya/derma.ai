import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const chatbotSchema = new mongoose(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: [
      {
        userMessage: { type: String, required: true },
        botResponse: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamp: true }
);

chatbotSchema.plugin(mongooseAggregatePaginate);

export const ChatBot = mongoose.model("ChatBot", chatbotSchema);
