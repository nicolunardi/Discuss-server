import mongoose from "mongoose";
import autopop from "mongoose-autopopulate";

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
    autopopulate: true,
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
    type: [
      {
        user: { type: Schema.Types.ObjectId, ref: "user" },
        react: { type: String },
      },
    ],
    default: [],
  },
});

messageSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret.__v;
    delete ret._id;
  },
});

messageSchema.plugin(autopop);

export default mongoose.model("message", messageSchema);
