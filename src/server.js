import "./config/loadEnv.js";
import express from "express";
import cors from "cors";

import {
  authRoutes,
  channelRoutes,
  userRoutes,
  messageRoutes,
} from "./routes/index.js";
import dbConnect from "./config/db.js";
import auth from "./middleware/auth.middleware.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10MB" }));
// doesn't need auth
app.use("/auth", authRoutes);

// all routes that require being logged in
app.use(auth);
app.use("/channels", channelRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

try {
  await dbConnect();
  app.listen(PORT, () => {
    console.log("running on PORT", PORT);
  });
} catch (error) {
  console.log(error);
}
