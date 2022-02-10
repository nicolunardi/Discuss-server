import express from "express";
import {
  getMessages,
  createMessage,
  getPinnedMessages,
} from "../controllers/messageController.controller.js";

const router = express.Router();

// done
router.get("/:channelId", getMessages);

// done
router.post("/:channelId", createMessage);

// done
router.put("/:channelId/:messageId", (req, res) => {
  res.send("update message of channel");
});

router.delete("/:channelId/:messageId", (req, res) => {
  res.send("delete message of channel");
});

router.get("/pin/:channelId", getPinnedMessages);

router.post("/pin/:channelId/:messageId", (req, res) => {
  res.send("pin message of channel");
});

router.post("/unpin/:channelId/:messageId", (req, res) => {
  res.send("unpin message of channel");
});

router.post("/react/:channelId/:messageId", (req, res) => {
  res.send("react to message of channel");
});

export default router;
