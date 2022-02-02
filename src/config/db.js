import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// connect to the database
const connect = () =>
  mongoose.connect(process.env.DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default connect;
