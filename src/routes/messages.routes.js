import express from "express";
import {
  getMessages,
  createMessage,
  getPinnedMessages,
  pinMessage,
  unpinMessage,
  deleteMessage,
  editMessage,
  react,
  unreact,
} from "../controllers/messageController.controller.js";

const router = express.Router();

router.get("/:channelId", getMessages);
router.post("/:channelId", createMessage);
router.put("/:channelId/:messageId", editMessage);
router.delete("/:channelId/:messageId", deleteMessage);
router.get("/pin/:channelId", getPinnedMessages);
router.post("/pin/:channelId/:messageId", pinMessage);
router.post("/unpin/:channelId/:messageId", unpinMessage);
router.post("/react/:channelId/:messageId", react);
router.post("/unreact/:channelId/:messageId", unreact);

export default router;
