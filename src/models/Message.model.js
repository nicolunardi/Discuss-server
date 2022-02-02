import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  channel: {
    type: Schema.Types.ObjectId,
    ref: "channel",
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  editedAt: {
    type: Date,
    default: Date.now,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  reacts: {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    react: { type: String },
  },
});

export default mongoose.model("message", messageSchema);
