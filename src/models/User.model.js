import mongoose from "mongoose";
import "mongoose-type-email";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
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

export default mongoose.model("user", userSchema);
