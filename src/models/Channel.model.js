import mongoose from "mongoose";

const { Schema } = mongoose;

const channelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    immutable: true,
  },
  private: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: "user",
  },
});

channelSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret.__v;
    delete ret._id;
  },
});

export default mongoose.model("channel", channelSchema);
