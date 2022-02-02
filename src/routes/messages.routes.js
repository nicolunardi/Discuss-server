import express from "express";

const router = express.Router();

router.get("/:channelId", (req, res) => {
  res.send("get channel messages");
});

router.post("/:channelId", (req, res) => {
  res.send("send messages to channel");
});

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
