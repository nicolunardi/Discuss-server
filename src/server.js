import "./config/loadEnv.js";
import express from "express";
import mongoose from "mongoose";
import {
  authRoutes,
  channelRoutes,
  userRoutes,
  messageRoutes,
} from "./routes/index.js";
import dbConnect from "./config/db.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
// doesn't need auth
app.use("/auth", authRoutes);
// needs auth place auth middleware here
app.use("/channels", channelRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

try {
  await dbConnect();
  app.listen(port, () => {
    console.log("running on port", port);
  });
} catch (error) {
  console.log(error);
}
