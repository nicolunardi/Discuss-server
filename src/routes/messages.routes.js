import express from "express";
import {
  getMessages,
  createMessage,
} from "../controllers/messageController.controller.js";

const router = express.Router();

router.get("/:channelId", getMessages);

router.post("/:channelId", createMessage);

router.put("/:channelId/:messageId", (req, res) => {
  res.send("update message of channel");
});

router.delete("/:channelId/:messageId", (req, res) => {
  res.send("delete message of channel");
});

router.post("/pin/:channelId/:messageId", (req, res) => {
  res.send("pin message of channel");
});

router.post("/unpin/:channelId/:messageId", (req, res) => {
  res.send("unpin message of channel");
});

router.post("/react/:channelId/:messageId", (req, res) => {
  res.send("unpin message of channel");
});

export default router;
