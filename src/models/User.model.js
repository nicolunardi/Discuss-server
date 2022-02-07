import mongoose from "mongoose";
import "mongoose-type-email";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
});

// remove unwanted attributes when JSON is requested
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.userId = ret._id;
    delete ret.password;
    delete ret.__v;
    delete ret._id;
  },
});

export default mongoose.model("user", userSchema);
