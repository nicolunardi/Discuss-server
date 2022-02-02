import express from "express";
import mongoose from "mongoose";
import {
  authRoutes,
  channelRoutes,
  userRoutes,
  messageRoutes,
} from "./routes/index.js";

import createUser from "./service/test.js";

const app = express();

const port = 3000;

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/channels", channelRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

app.listen(port, () => {
  console.log("running on port", 3000);
});
